"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

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

      <div className="relative z-10 w-full max-w-md">
        {/* Back nav */}
        <div className="mb-8 flex justify-start">
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
        </div>

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-muted-foreground backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            ÁREA RESTRITA
          </div>
          <h1 className="bg-linear-to-b from-white via-white/90 to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Acesse sua
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              conta
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground/80">
            Entre com suas credenciais para acessar o ProposalGen AI.
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="mr-2">✅</span>
            {message}
          </div>
        )}

        {/* Login Card */}
        <Card className="border-white/10 bg-card/50 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">🔐 Login</CardTitle>
            <CardDescription>
              Insira seu e-mail e senha para continuar.
            </CardDescription>
          </CardHeader>

          <form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="border-white/10 bg-white/5 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-violet-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="border-white/10 bg-white/5 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-violet-500/50"
                />
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button
                id="login-btn"
                formAction={login}
                type="submit"
                size="lg"
                className="w-full cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 text-sm font-semibold tracking-wide text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-500/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                    clipRule="evenodd"
                  />
                </svg>
                Entrar
              </Button>

              <div className="relative flex w-full items-center gap-2 py-1">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] text-muted-foreground/40">ou</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Button
                id="signup-btn"
                formAction={signup}
                type="submit"
                variant="outline"
                size="lg"
                className="w-full cursor-pointer border-white/10 bg-white/5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
                </svg>
                Criar Conta
              </Button>

              <p className="text-center text-[11px] text-muted-foreground/40">
                Ao criar uma conta, você concorda com os termos de uso do
                ProposalGen AI.
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground/30">
          ProposalGen AI &copy; {new Date().getFullYear()} — Powered by Next.js
          + Supabase Auth
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
