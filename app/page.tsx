"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [briefing, setBriefing] = useState("");

  return (
    <div className="dark relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background gradient orbs */}
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

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-muted-foreground backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            IA GENERATIVA
          </div>
          <h1 className="bg-linear-to-b from-white via-white/90 to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            ProposalGen
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              AI
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground/80">
            Transforme briefings em propostas comerciais profissionais com
            inteligência artificial.
          </p>
        </div>

        {/* Main Card */}
        <Card
          id="briefing-card"
          className="border-white/10 bg-card/50 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              📋 Briefing do Cliente
            </CardTitle>
            <CardDescription>
              Cole ou digite abaixo o briefing do seu cliente — pode ser um
              texto transcrito de áudio, anotações de reunião ou qualquer
              descrição do projeto.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Label htmlFor="briefing-input" className="sr-only">
              Briefing do Cliente
            </Label>
            <Textarea
              id="briefing-input"
              placeholder={`Ex: "O cliente precisa de um site institucional com 5 páginas, integração com WhatsApp, formulário de contato e painel administrativo. Prazo de 30 dias, orçamento aproximado de R$5.000..."`}
              value={briefing}
              onChange={(e) => setBriefing(e.target.value)}
              rows={8}
              className="resize-none border-white/10 bg-white/5 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-violet-500/50"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground/50">
              <span>
                {briefing.length > 0
                  ? `${briefing.length} caracteres`
                  : "Nenhum texto inserido"}
              </span>
              <span>Mín. recomendado: 100 caracteres</span>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button
              id="generate-proposal-btn"
              size="lg"
              disabled={briefing.trim().length < 10}
              className="w-full cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 text-sm font-semibold tracking-wide text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-40 disabled:shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-7.86-3.83.75.75 0 0 1-.254-1.285 41.059 41.059 0 0 1 8.198-5.424ZM6.303 8.832A35.148 35.148 0 0 1 10 11.04a35.148 35.148 0 0 1 3.697-2.208 42.952 42.952 0 0 0-3.697-2.51 42.942 42.942 0 0 0-3.697 2.51Zm-1.28 2.18A31.602 31.602 0 0 0 1 11.585v.12a.75.75 0 0 0 .424.672C5.247 14.426 9.407 17.16 10 20c.593-2.84 4.753-5.574 8.576-7.623A.75.75 0 0 0 19 11.705v-.12a31.56 31.56 0 0 0-4.023-.573 33.644 33.644 0 0 0-4.977 3.227.75.75 0 0 1-.84 0 33.65 33.65 0 0 0-4.977-3.227 31.58 31.58 0 0 0-.16.001Z"
                  clipRule="evenodd"
                />
              </svg>
              Gerar Proposta Comercial
            </Button>
            <p className="text-center text-[11px] text-muted-foreground/40">
              A IA analisará o briefing e gerará uma proposta comercial
              estruturada e personalizada.
            </p>
          </CardFooter>
        </Card>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground/30">
          ProposalGen AI &copy; {new Date().getFullYear()} — Powered by Next.js
          + shadcn/ui
        </p>
      </div>
    </div>
  );
}
