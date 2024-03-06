export default {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "useESM": true
      }
    },
    moduleNameMapper: {
      "(.+)\\.js": "$1"
    },
    extensionsToTreatAsEsm: [".ts"],
  }