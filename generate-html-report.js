// generate-html-report.js

const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report.html',
    screenshotsDirectory: 'reports/screenshots/',
    storeScreenshots: false,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    failedSummaryReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome  122.0.6261.112",
        "Platform": "Windows 11",
        "Parallel": "Scenarios",
        "Executed": "Local"
    },
};

reporter.generate(options);

