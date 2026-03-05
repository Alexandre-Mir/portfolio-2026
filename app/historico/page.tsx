import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MessageSquare, FileText, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface Proposal {
  id: string;
  created_at: string;
  briefing: string;
  content: string | null;
}

async function getProposals(): Promise<Proposal[]> {
  // Recuperar o usuário autenticado via cookies da sessão
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials not found");
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/proposals?select=*&order=created_at.desc&user_id=eq.${user.id}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch proposals:", error);
    return [];
  }
}

export default async function HistoricoPage() {
  const proposals = await getProposals();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getExcerpt = (text: string | null, length: number = 150) => {
    if (!text) return "Sem conteúdo.";
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  return (
    <div className="dark relative flex min-h-screen flex-col items-center bg-background px-4 py-12">
      {/* Background gradient orbs (matching home) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="bg-linear-to-r from-white to-white/60 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Histórico de Propostas
            </h1>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Visualize suas gerações anteriores
            </p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {proposals.length === 0 ? (
          <Card className="border-white/10 bg-card/50 backdrop-blur-xl p-12 text-center">
            <p className="text-muted-foreground font-medium mb-4">
              Nenhuma proposta encontrada no histórico.
            </p>
            <Link href="/">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Gerar minha primeira proposta
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {proposals.map((proposal: Proposal) => (
              <Card
                key={proposal.id}
                className="flex flex-col border-white/10 bg-card/50 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:shadow-violet-500/10"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-white/10">
                      <Calendar className="h-3 w-3" />
                      {formatDate(proposal.created_at)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1 text-base font-semibold text-foreground">
                    {getExcerpt(proposal.briefing, 50)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col space-y-4">
                  <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                    <h4 className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-violet-400">
                      <MessageSquare className="h-3 w-3" />
                      Briefing do Cliente
                    </h4>
                    <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground/80 italic">
                      &quot;{getExcerpt(proposal.briefing, 150)}&quot;
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                    <h4 className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      <FileText className="h-3 w-3" />
                      Proposta Comercial
                    </h4>
                    <p className="line-clamp-4 text-xs leading-relaxed text-muted-foreground/90">
                      {getExcerpt(proposal.content, 180)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer hint */}
        <p className="mt-12 text-center text-[10px] text-muted-foreground/20">
          ProposalGen AI &copy; {new Date().getFullYear()} — Dados armazenados
          com segurança no Supabase
        </p>
      </div>
    </div>
  );
}
