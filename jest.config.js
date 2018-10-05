let config = {
  "verbose": false,
	"testMatch": [ "<rootDir>/test/**/?(*.)(test).{js}" ],
	"collectCoverage": true,
	"coverageReporters": [ "html" ],
	"collectCoverageFrom": [ "src/**/*.{js}" ],
	"coveragePathIgnorePatterns": [],
	"coverageThreshold": {
		"global": {
			"branches": 50, "functions": 50,
			"lines": 50, "statements": 50
		}
	}
};

module.exports = config;
