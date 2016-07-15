import {
  isStandardSyntaxMediaFeature,
  report,
  ruleMessages,
  validateOptions,
} from "../../utils"
import mediaParser from "postcss-media-query-parser"

export const ruleName = "media-feature-name-case"

export const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

export default function (expectation) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "lower",
        "upper",
      ],
    })
    if (!validOptions) { return }

    root.walkAtRules(/^media$/i, atRule => {
      mediaParser(atRule.params).walk(/^media-feature$/i, mediaFeatureNode => {
        if (!isStandardSyntaxMediaFeature(mediaFeatureNode.value)) { return }

        const mediaFeatureName = mediaFeatureNode.value

        const expectedFeatureName = expectation === "lower"
          ? mediaFeatureName.toLowerCase()
          : mediaFeatureName.toUpperCase()

        if (mediaFeatureName === expectedFeatureName) { return }

        report({
          index: atRule.name.length + atRule.raws.afterName.length + mediaFeatureNode.sourceIndex + 1,
          message: messages.expected(mediaFeatureName, expectedFeatureName),
          node: atRule,
          ruleName,
          result,
        })
      })
    })
  }
}
