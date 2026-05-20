import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  DiagnosticCategory,
  flattenDiagnosticMessageText,
  JsxEmit,
  ModuleKind,
  ScriptTarget,
  transpileModule,
} from "typescript";

import { expectError, expectSuccess, runTRPCTest, type TestConfig } from "./test-utils";

function expectParseableTypeScript(content: string) {
  const diagnostics =
    transpileModule(content, {
      compilerOptions: {
        jsx: JsxEmit.ReactJSX,
        module: ModuleKind.ESNext,
        target: ScriptTarget.ESNext,
      },
      fileName: "generated.tsx",
      reportDiagnostics: true,
    }).diagnostics?.filter((diagnostic) => diagnostic.category === DiagnosticCategory.Error) ?? [];

  expect(
    diagnostics.map((diagnostic) => flattenDiagnosticMessageText(diagnostic.messageText, "\n")),
  ).toEqual([]);
}

describe("Frontend Configurations", () => {
  describe("React Generated Shell", () => {
    it("should generate a polished shadcn-style shell using Base UI primitives", async () => {
      const reactShellCases = [
        {
          projectName: "tanstack-router-generated-shell",
          frontend: "tanstack-router",
          routePath: "apps/web/src/routes/index.tsx",
        },
        {
          projectName: "react-router-generated-shell",
          frontend: "react-router",
          routePath: "apps/web/src/routes/_index.tsx",
        },
        {
          projectName: "tanstack-start-generated-shell",
          frontend: "tanstack-start",
          routePath: "apps/web/src/routes/index.tsx",
        },
        {
          projectName: "next-generated-shell",
          frontend: "next",
          routePath: "apps/web/src/app/page.tsx",
          backend: "self",
          runtime: "none",
        },
      ] satisfies Array<{
        projectName: string;
        frontend: "tanstack-router" | "react-router" | "tanstack-start" | "next";
        routePath: string;
        backend?: "hono" | "self";
        runtime?: "bun" | "none";
      }>;

      for (const shellCase of reactShellCases) {
        const result = await runTRPCTest({
          projectName: shellCase.projectName,
          frontend: [shellCase.frontend],
          backend: shellCase.backend ?? "hono",
          runtime: shellCase.runtime ?? "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          git: false,
          install: false,
        });

        expectSuccess(result);
        const projectDir = result.projectDir;
        if (!projectDir) throw new Error("Expected generated project directory");

        const homeContent = await readFile(
          join(projectDir, "apps/web/src/components/home-content.tsx"),
          "utf-8",
        );
        const route = await readFile(join(projectDir, shellCase.routePath), "utf-8");
        const header = await readFile(
          join(projectDir, "apps/web/src/components/header.tsx"),
          "utf-8",
        );
        const button = await readFile(
          join(projectDir, "packages/ui/src/components/button.tsx"),
          "utf-8",
        );
        const dropdownMenu = await readFile(
          join(projectDir, "packages/ui/src/components/dropdown-menu.tsx"),
          "utf-8",
        );
        const label = await readFile(
          join(projectDir, "packages/ui/src/components/label.tsx"),
          "utf-8",
        );
        const skeleton = await readFile(
          join(projectDir, "packages/ui/src/components/skeleton.tsx"),
          "utf-8",
        );
        const theme = await readFile(
          join(projectDir, "packages/ui/src/styles/globals.css"),
          "utf-8",
        );

        expect(homeContent).toContain("A generated app shell that already feels designed.");
        expect(homeContent).toContain("GENERATED_STACK");
        expect(homeContent).toContain("CLI_COMMAND");
        expect(homeContent).toContain("PROJECT_STATUS");
        expect(homeContent).toContain("WORKBENCH_RULES");
        expect(homeContent).toContain(
          "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)",
        );
        expect(homeContent).toContain(`@${shellCase.projectName}/ui/components/button`);
        expect(homeContent).not.toContain("TITLE_TEXT");
        expect(route).toContain("HomeContent");
        expect(header).toContain("h-14");
        expect(header).toContain("Search docs");
        expect(header).toContain("https://better-t-stack.dev/docs");
        expect(header).toContain("Demo");
        expect(header).toContain("GitHub repository");
        expect(button).toContain("@base-ui/react/button");
        expect(button).toContain("rounded-lg");
        expect(dropdownMenu).toContain("bg-popover p-1");
        expect(dropdownMenu).toContain("rounded-md px-1.5 py-1 text-sm");
        expect(label).toContain("text-sm leading-none font-medium");
        expect(skeleton).toContain("rounded-md bg-muted");
        expect(theme).toContain("--radius: 0.625rem");
        expect(theme).toContain("--background: oklch(0.955 0.004 279)");
        expect(theme).toContain("--card: oklch(0.99 0.003 279)");
        expect(theme).toContain("--primary: oklch(0.22 0.012 279)");
        expect(theme).toContain("--primary-foreground: oklch(0.985 0.004 279)");
        expect(theme).toContain("--muted: oklch(0.92 0.005 279)");
        expect(theme).toContain("--border: oklch(0.88 0.006 279)");
        expect(theme).toContain("--font-heading: var(--font-sans)");
        expect(theme).toContain("--radius-2xl: calc(var(--radius) * 1.8)");
        expectParseableTypeScript(homeContent);
        expectParseableTypeScript(route);
        expectParseableTypeScript(header);
        expectParseableTypeScript(button);
        expectParseableTypeScript(dropdownMenu);
        expectParseableTypeScript(label);
        expectParseableTypeScript(skeleton);
      }
    });
  });

  describe("Non-React Generated Shell", () => {
    it("should generate a polished workbench shell across web frontends", async () => {
      const webShellCases = [
        {
          projectName: "astro-polished-shell",
          frontend: "astro",
          shellPath: "apps/web/src/pages/index.astro",
          headerPath: "apps/web/src/components/Header.astro",
          stylePath: "apps/web/src/styles/global.css",
        },
        {
          projectName: "solid-polished-shell",
          frontend: "solid",
          shellPath: "apps/web/src/routes/index.tsx",
          headerPath: "apps/web/src/components/header.tsx",
          stylePath: "apps/web/src/styles.css",
        },
        {
          projectName: "svelte-polished-shell",
          frontend: "svelte",
          shellPath: "apps/web/src/routes/+page.svelte",
          headerPath: "apps/web/src/components/Header.svelte",
          stylePath: "apps/web/src/app.css",
        },
        {
          projectName: "nuxt-polished-shell",
          frontend: "nuxt",
          shellPath: "apps/web/app/pages/index.vue",
          headerPath: "apps/web/app/components/Header.vue",
          stylePath: "apps/web/app/assets/css/main.css",
        },
      ] satisfies Array<{
        projectName: string;
        frontend: "astro" | "solid" | "svelte" | "nuxt";
        shellPath: string;
        headerPath: string;
        stylePath: string;
      }>;

      for (const shellCase of webShellCases) {
        const result = await runTRPCTest({
          projectName: shellCase.projectName,
          frontend: [shellCase.frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          git: false,
          install: false,
        });

        expectSuccess(result);
        const projectDir = result.projectDir;
        if (!projectDir) throw new Error("Expected generated project directory");

        const shell = await readFile(join(projectDir, shellCase.shellPath), "utf-8");
        const header = await readFile(join(projectDir, shellCase.headerPath), "utf-8");
        const style = await readFile(join(projectDir, shellCase.stylePath), "utf-8");

        expect(shell).toContain("GENERATED_STACK");
        expect(shell).toContain("CLI_COMMAND");
        expect(shell).toContain("PROJECT_STATUS");
        expect(shell).toContain("WORKBENCH_RULES");
        expect(shell).toContain("A generated app shell that already feels designed.");
        expect(shell).toContain("bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)");
        expect(shell).not.toContain("TITLE_TEXT");
        expect(shell).not.toContain("████");
        expect(header).toContain("h-14");
        expect(header).toContain("Search docs");
        expect(header).toContain("Demo");
        expect(style).toContain("--primary: oklch(0.22 0.012 279)");
        expect(style).toContain("--background: oklch(0.955 0.004 279)");
        expect(style).toContain("--card: oklch(0.99 0.003 279)");
        expect(style).toContain("--muted: oklch(0.92 0.005 279)");
        expect(style).toContain("--border: oklch(0.88 0.006 279)");
        expect(style).toContain("--radius: 0.625rem");
        expect(style).toContain("--color-popover: var(--popover)");
        expect(style).toContain("--color-ring: var(--ring)");

        if (shellCase.frontend === "solid") {
          expectParseableTypeScript(shell);
          expectParseableTypeScript(header);
        }
      }
    });
  });

  describe("Better Auth Generated Forms", () => {
    it("should generate polished login and signup forms aligned with start-shadcn-example", async () => {
      const authFormCases = [
        {
          projectName: "next-auth-polished-forms",
          frontend: "next",
          api: "trpc",
          signInPath: "apps/web/src/components/sign-in-form.tsx",
          signUpPath: "apps/web/src/components/sign-up-form.tsx",
          loginPath: "apps/web/src/app/login/page.tsx",
          dashboardPath: "apps/web/src/app/dashboard/dashboard.tsx",
          userMenuPath: "apps/web/src/components/user-menu.tsx",
          parseTypeScript: true,
        },
        {
          projectName: "solid-auth-polished-forms",
          frontend: "solid",
          api: "orpc",
          signInPath: "apps/web/src/components/sign-in-form.tsx",
          signUpPath: "apps/web/src/components/sign-up-form.tsx",
          loginPath: "apps/web/src/routes/login.tsx",
          dashboardPath: "apps/web/src/routes/dashboard.tsx",
          userMenuPath: "apps/web/src/components/user-menu.tsx",
          parseTypeScript: true,
        },
        {
          projectName: "svelte-auth-polished-forms",
          frontend: "svelte",
          api: "orpc",
          signInPath: "apps/web/src/components/SignInForm.svelte",
          signUpPath: "apps/web/src/components/SignUpForm.svelte",
          loginPath: "apps/web/src/routes/login/+page.svelte",
          dashboardPath: "apps/web/src/routes/dashboard/+page.svelte",
          userMenuPath: "apps/web/src/components/UserMenu.svelte",
          parseTypeScript: false,
        },
        {
          projectName: "astro-auth-polished-forms",
          frontend: "astro",
          api: "orpc",
          signInPath: "apps/web/src/components/SignInForm.astro",
          signUpPath: "apps/web/src/components/SignUpForm.astro",
          loginPath: "apps/web/src/pages/login.astro",
          dashboardPath: "apps/web/src/pages/dashboard.astro",
          parseTypeScript: false,
        },
      ] satisfies Array<{
        projectName: string;
        frontend: "next" | "solid" | "svelte" | "astro";
        api: "trpc" | "orpc";
        signInPath: string;
        signUpPath: string;
        loginPath: string;
        dashboardPath: string;
        userMenuPath?: string;
        parseTypeScript: boolean;
      }>;

      for (const formCase of authFormCases) {
        const result = await runTRPCTest({
          projectName: formCase.projectName,
          frontend: [formCase.frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "better-auth",
          api: formCase.api,
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          git: false,
          install: false,
        });

        expectSuccess(result);
        const projectDir = result.projectDir;
        if (!projectDir) throw new Error("Expected generated project directory");

        const signIn = await readFile(join(projectDir, formCase.signInPath), "utf-8");
        const signUp = await readFile(join(projectDir, formCase.signUpPath), "utf-8");
        const login = await readFile(join(projectDir, formCase.loginPath), "utf-8");
        const dashboard = await readFile(join(projectDir, formCase.dashboardPath), "utf-8");
        const userMenu = formCase.userMenuPath
          ? await readFile(join(projectDir, formCase.userMenuPath), "utf-8")
          : "";

        expect(signIn).toContain("Sign In");
        expect(signUp).toContain("Sign Up");
        expect(signIn).toContain("max-w-md");
        expect(signUp).toContain("max-w-md");
        expect(signIn).toContain("rounded-2xl");
        expect(signUp).toContain("rounded-2xl");
        expect(signIn).toContain("h-11");
        expect(signUp).toContain("h-11");
        expect(signIn).toContain("border-transparent bg-muted");
        expect(signUp).toContain("border-transparent bg-muted");
        expect(signIn).toContain("shadow-[0_18px_50px_oklch(0.2_0.01_279_/_0.10)]");
        expect(signUp).toContain("shadow-[0_18px_50px_oklch(0.2_0.01_279_/_0.10)]");
        expect(signIn).not.toContain("Welcome Back");
        expect(signUp).not.toContain("Create Account");
        expect(signIn).not.toContain("Continue with GitHub");
        expect(signUp).not.toContain("Continue with GitHub");
        expect(signIn).not.toContain("Continue with Passkey");
        expect(signUp).not.toContain("Continue with Passkey");
        expect(signIn).not.toContain("text-indigo");
        expect(signUp).not.toContain("text-indigo");
        expect(login).toContain("items-center justify-center");
        expect(dashboard).toContain("AUTH_READY");
        expect(dashboard).toContain("ring-foreground/10");
        expect(dashboard).not.toContain("<h1>Dashboard</h1>");
        if (userMenu) {
          expect(userMenu).not.toContain("bg-red-600");
          expect(userMenu).toContain("destructive");
        }

        if (formCase.parseTypeScript) {
          expectParseableTypeScript(signIn);
          expectParseableTypeScript(signUp);
          expectParseableTypeScript(login);
          expectParseableTypeScript(dashboard);
          if (userMenu) {
            expectParseableTypeScript(userMenu);
          }
        }
      }
    });
  });

  describe("Native Generated Shell", () => {
    it("should keep native starter screens aligned with the polished shell", async () => {
      const nativeShellCases = [
        {
          projectName: "native-bare-polished-shell",
          frontend: "native-bare",
          auth: "none",
          expectProjectStatus: false,
        },
        {
          projectName: "native-uniwind-polished-shell",
          frontend: "native-uniwind",
          auth: "none",
          expectProjectStatus: false,
        },
        {
          projectName: "native-unistyles-auth-polished-shell",
          frontend: "native-unistyles",
          auth: "better-auth",
          expectProjectStatus: true,
        },
      ] satisfies Array<{
        projectName: string;
        frontend: "native-bare" | "native-uniwind" | "native-unistyles";
        auth: "none" | "better-auth";
        expectProjectStatus: boolean;
      }>;

      for (const shellCase of nativeShellCases) {
        const result = await runTRPCTest({
          projectName: shellCase.projectName,
          frontend: [shellCase.frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: shellCase.auth,
          api: "trpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          git: false,
          install: false,
        });

        expectSuccess(result);
        const projectDir = result.projectDir;
        if (!projectDir) throw new Error("Expected generated project directory");

        const shell = await readFile(
          join(projectDir, "apps/native/app/(drawer)/index.tsx"),
          "utf-8",
        );

        expect(shell).toContain("GENERATED_STACK");
        expect(shell).toContain("Better T Stack");
        expect(shell).not.toContain("BETTER T STACK");
        expect(shell).not.toContain("API Status");
        expect(shell).not.toContain("TITLE_TEXT");
        expect(shell).not.toContain("████");

        if (shellCase.expectProjectStatus) {
          expect(shell).toContain("PROJECT_STATUS");
        }

        expectParseableTypeScript(shell);
      }
    });
  });

  describe("Single Frontend Options", () => {
    const singleFrontends = [
      "tanstack-router",
      "react-router",
      "tanstack-start",
      "next",
      "nuxt",
      "native-bare",
      "native-uniwind",
      "native-unistyles",
      "svelte",
      "solid",
      "astro",
    ] satisfies ReadonlyArray<
      | "tanstack-router"
      | "react-router"
      | "tanstack-start"
      | "next"
      | "nuxt"
      | "native-bare"
      | "native-uniwind"
      | "native-unistyles"
      | "svelte"
      | "solid"
      | "astro"
    >;

    for (const frontend of singleFrontends) {
      it(`should work with ${frontend}`, async () => {
        const config: TestConfig = {
          projectName: `${frontend}-app`,
          frontend: [frontend],
          install: false,
        };

        // Set compatible defaults based on frontend
        if (frontend === "solid") {
          // Solid is not compatible with Convex backend
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.auth = "none";
          config.api = "orpc"; // tRPC not supported with solid
          config.addons = ["none"];
          config.examples = ["none"];
          config.dbSetup = "none";
          config.webDeploy = "none";
          config.serverDeploy = "none";
        } else if (frontend === "next") {
          // Next.js can use self backend (fullstack)
          config.backend = "self";
          config.runtime = "none";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.auth = "better-auth";
          config.api = "trpc";
          config.addons = ["none"];
          config.examples = ["none"];
          config.dbSetup = "none";
          config.webDeploy = "none";
          config.serverDeploy = "none";
        } else if (["nuxt", "svelte"].includes(frontend)) {
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.auth = "none";
          config.api = "orpc"; // tRPC not supported with nuxt/svelte
          config.addons = ["none"];
          config.examples = ["none"];
          config.dbSetup = "none";
          config.webDeploy = "none";
          config.serverDeploy = "none";
        } else if (frontend === "astro") {
          // Astro uses oRPC, not Convex compatible
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.auth = "none";
          config.api = "orpc"; // tRPC not supported with astro
          config.addons = ["none"];
          config.examples = ["none"];
          config.dbSetup = "none";
          config.webDeploy = "none";
          config.serverDeploy = "none";
        } else {
          config.backend = "hono";
          config.runtime = "bun";
          config.database = "sqlite";
          config.orm = "drizzle";
          config.auth = "none";
          config.api = "trpc";
          config.addons = ["none"];
          config.examples = ["none"];
          config.dbSetup = "none";
          config.webDeploy = "none";
          config.serverDeploy = "none";
        }

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }
  });

  describe("Frontend Compatibility with API", () => {
    it("should work with React frontends + tRPC", async () => {
      const result = await runTRPCTest({
        projectName: "react-trpc",
        frontend: ["tanstack-router"],
        api: "trpc",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with Nuxt + tRPC", async () => {
      const result = await runTRPCTest({
        projectName: "nuxt-trpc-fail",
        frontend: ["nuxt"],
        api: "trpc",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tRPC API is not supported with 'nuxt' frontend");
    });

    it("should fail with Svelte + tRPC", async () => {
      const result = await runTRPCTest({
        projectName: "svelte-trpc-fail",
        frontend: ["svelte"],
        api: "trpc",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tRPC API is not supported with 'svelte' frontend");
    });

    it("should fail with Solid + tRPC", async () => {
      const result = await runTRPCTest({
        projectName: "solid-trpc-fail",
        frontend: ["solid"],
        api: "trpc",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tRPC API is not supported with 'solid' frontend");
    });

    it("should fail with Astro + tRPC", async () => {
      const result = await runTRPCTest({
        projectName: "astro-trpc-fail",
        frontend: ["astro"],
        api: "trpc",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tRPC API is not supported with 'astro' frontend");
    });

    const frontends = ["nuxt", "svelte", "solid", "astro"] as const;
    for (const frontend of frontends) {
      it(`should work with ${frontend} + oRPC`, async () => {
        const result = await runTRPCTest({
          projectName: `${frontend}-orpc`,
          frontend: [frontend],
          api: "orpc",
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    }
  });

  describe("Frontend Compatibility with Backend", () => {
    it("should fail Solid + Convex", async () => {
      const result = await runTRPCTest({
        projectName: "solid-convex-fail",
        frontend: ["solid"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(
        result,
        "The following frontends are not compatible with '--backend convex': solid. Please choose a different frontend or backend.",
      );
    });

    it("should fail Astro + Convex", async () => {
      const result = await runTRPCTest({
        projectName: "astro-convex-fail",
        frontend: ["astro"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(
        result,
        "The following frontends are not compatible with '--backend convex': astro. Please choose a different frontend or backend.",
      );
    });

    it("should work with React frontends + Convex", async () => {
      const result = await runTRPCTest({
        projectName: "react-convex",
        frontend: ["tanstack-router"],
        backend: "convex",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "clerk",
        api: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Frontend Compatibility with Auth", () => {
    const incompatibleFrontends = ["nuxt", "svelte", "solid", "astro"] as const;
    for (const frontend of incompatibleFrontends) {
      it(`should fail incompatible ${frontend} with Clerk`, async () => {
        const result = await runTRPCTest({
          projectName: `${frontend}-clerk-fail`,
          frontend: [frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "clerk",
          api: "orpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "Clerk authentication is not compatible");
      });
    }

    const compatibleFrontends = [
      "tanstack-router",
      "react-router",
      "tanstack-start",
      "next",
    ] as const;
    for (const frontend of compatibleFrontends) {
      it(`should work with compatible ${frontend} + Clerk`, async () => {
        const result = await runTRPCTest({
          projectName: `${frontend}-clerk`,
          frontend: [frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "clerk",
          api: "trpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    }
  });

  describe("Multiple Frontend Constraints", () => {
    it("should fail with multiple web frontends", async () => {
      const result = await runTRPCTest({
        projectName: "multiple-web-fail",
        frontend: ["tanstack-router", "react-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot select multiple web frameworks");
    });

    it("should fail with multiple native frontends", async () => {
      const result = await runTRPCTest({
        projectName: "multiple-native-fail",
        frontend: ["native-bare", "native-unistyles"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot select multiple native frameworks");
    });

    it("should work with one web + one native frontend", async () => {
      const result = await runTRPCTest({
        projectName: "web-native-combo",
        frontend: ["tanstack-router", "native-bare"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Frontend with None Option", () => {
    it("should work with frontend none", async () => {
      const result = await runTRPCTest({
        projectName: "no-frontend",
        frontend: ["none"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with none + other frontends", async () => {
      const result = await runTRPCTest({
        projectName: "none-with-other-fail",
        frontend: ["none", "tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot combine 'none' with other frontend options");
    });
  });

  describe("Next.js with Self Backend", () => {
    it("should work with Next.js and self backend", async () => {
      const result = await runTRPCTest({
        projectName: "nextjs-self-backend",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with Next.js and traditional backend", async () => {
      const result = await runTRPCTest({
        projectName: "nextjs-traditional-backend",
        frontend: ["next"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Nuxt with Self Backend", () => {
    it("should work with Nuxt and self backend", async () => {
      const result = await runTRPCTest({
        projectName: "nuxt-self-backend",
        frontend: ["nuxt"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        api: "orpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with Nuxt and traditional backend", async () => {
      const result = await runTRPCTest({
        projectName: "nuxt-traditional-backend",
        frontend: ["nuxt"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Astro with Self Backend", () => {
    it("should work with Astro and self backend", async () => {
      const result = await runTRPCTest({
        projectName: "astro-self-backend",
        frontend: ["astro"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        api: "orpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with Astro and traditional backend", async () => {
      const result = await runTRPCTest({
        projectName: "astro-traditional-backend",
        frontend: ["astro"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Web Deploy Constraints", () => {
    it("should work with web frontend + web deploy", async () => {
      const result = await runTRPCTest({
        projectName: "web-deploy",
        frontend: ["tanstack-router"],
        webDeploy: "cloudflare",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with web deploy but no web frontend", async () => {
      const result = await runTRPCTest({
        projectName: "web-deploy-no-frontend-fail",
        frontend: ["native-bare"],
        webDeploy: "cloudflare",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "'--web-deploy' requires a web frontend");
    });
  });
});
