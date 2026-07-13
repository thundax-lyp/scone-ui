export const App = () => (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
        <section className="mx-auto flex max-w-5xl flex-col gap-8">
            <header className="flex flex-col gap-3">
                <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                    scone-ui
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-white">
                    React + TailwindCSS frontend project
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                    A clean starter for building the Scone UI surface with typed React, Vite,
                    TailwindCSS, linting, formatting, and tests.
                </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-3">
                {["Vite", "React", "TailwindCSS"].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                        <h2 className="text-lg font-medium text-white">{item}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Initialized and ready.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    </main>
);
