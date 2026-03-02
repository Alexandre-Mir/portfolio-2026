import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 60;

const systemPrompt = `Você é um especialista em criação de propostas comerciais para projetos de tecnologia, design e marketing digital. 

Ao receber o briefing do cliente, você deve gerar uma proposta comercial completa, profissional e bem-estruturada em Markdown, seguindo esta estrutura:

## 📋 Resumo Executivo
Um parágrafo conciso resumindo a compreensão do projeto e os principais entregáveis.

## 🎯 Escopo do Projeto
Lista detalhada de tudo o que está incluso na proposta, organizado por módulos ou fases.

## 🛠️ Metodologia e Tecnologias
Explicação breve da abordagem técnica e das tecnologias recomendadas, justificando as escolhas.

## 📅 Cronograma Estimado
Tabela ou lista com as fases do projeto e prazos estimados.

## 💰 Investimento
Apresentação do valor do projeto, com possibilidade de parcelamento. Se o briefing contiver valores de referência, use-os; caso contrário, sugira uma faixa com base no escopo.

## ✅ Próximos Passos
Instruções claras sobre como o cliente pode aprovar e iniciar o projeto.

---

Regras:
- Use linguagem formal mas acessível, transmitindo confiança e profissionalismo.
- Formate toda a saída em Markdown limpo e bem-estruturado.
- Adapte o tom e a complexidade ao nível de detalhe do briefing recebido.
- Inclua estimativas realistas com base nas informações disponíveis.
- Se informações estiverem faltando, faça suposições razoáveis e indique-as como "Premissas adotadas".`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "⚠️ Supabase credentials not found. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
    );
  }

  // Gera um ID para identificar essa operação de salvar no banco
  const sessionId = crypto.randomUUID();
  let proposalId: string | null = null;

  // 1. Inserir o briefing inicial no banco de dados ANTES de chamar a IA
  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/proposals`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation", // Para nos retornar os dados criados (o ID)
        },
        body: JSON.stringify({
          briefing: prompt,
          session_id: sessionId,
          content: null, // Será preenchido ao final do stream
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Supabase error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      if (data && data.length > 0) {
        proposalId = data[0].id;
      }
    } catch (error) {
      console.error("❌ Falha na persistência inicial no Supabase:", error);
      // Retornar 500 informando falha técnica para evitar gerar proposta (gastar créditos) sem salvá-la
      return new Response(
        "Falha ao salvar a solicitação. Tente novamente mais tarde.",
        { status: 500 },
      );
    }
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    prompt: `Briefing do cliente:\n\n${prompt}`,
    onFinish: async ({ text }) => {
      // 2. Após concluir o streaming, faz PATCH para atualizar a coluna "content"
      if (proposalId && supabaseUrl && supabaseKey) {
        try {
          const patchResponse = await fetch(
            `${supabaseUrl}/rest/v1/proposals?id=eq.${proposalId}`,
            {
              method: "PATCH",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: text,
              }),
            },
          );

          if (!patchResponse.ok) {
            console.error(
              "❌ Falha ao atualizar proposta no Supabase:",
              patchResponse.status,
              patchResponse.statusText,
            );
          } else {
            console.log(`✅ Proposta ${proposalId} salva com sucesso.`);
          }
        } catch (error) {
          console.error("❌ Erro ao realizar PATCH no Supabase:", error);
        }
      }
    },
  });

  return result.toTextStreamResponse();
}
