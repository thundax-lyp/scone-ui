import { DefaultReporter } from "vitest/node";

export default class QuietReporter extends DefaultReporter {
    #startedAt = 0;

    onTestRunStart() {
        this.#startedAt = Date.now();
    }

    onTestModuleQueued() {}

    onTestModuleCollected() {}

    onTestModuleStart() {}

    onTestModuleEnd() {}

    onTestCaseReady() {}

    onTestCaseResult() {}

    onTestSuiteReady() {}

    onTestSuiteResult() {}

    onHookStart() {}

    onHookEnd() {}

    onTestRunEnd(testModules, unhandledErrors, reason) {
        if (reason !== "passed" || unhandledErrors.length > 0) {
            super.onTestRunEnd(testModules, unhandledErrors, reason);
            return;
        }

        const testCount = testModules.reduce(
            (count, testModule) => count + Array.from(testModule.children.allTests()).length,
            0,
        );
        const durationSeconds = ((Date.now() - this.#startedAt) / 1000).toFixed(2);

        this.log(
            `Tests passed: ${testCount} tests in ${testModules.length} files (${durationSeconds}s)`,
        );
    }
}
