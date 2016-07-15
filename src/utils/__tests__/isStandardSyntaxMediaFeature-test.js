import isStandardSyntaxMediaFeature from "../isStandardSyntaxMediaFeature"
import test from "tape"

test("isStandardSyntaxMediaFeature", t => {
  t.ok(isStandardSyntaxMediaFeature("min-width"), "keyword")
  t.ok(isStandardSyntaxMediaFeature("-webkit-min-device-pixel-ratio"), "keyword")
  t.notOk(isStandardSyntaxMediaFeature("--viewport-medium"), "css var")
  t.notOk(isStandardSyntaxMediaFeature("$sass-variable"), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("min-width + $value"), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("$value + min-width"), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("'min-width + $value'"), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("'$value + min-width'"), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("\"min-width + $value\""), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("\"$value + min-width\""), "scss var")
  t.notOk(isStandardSyntaxMediaFeature("min-width#{$value}"), "scss interpolation")
  t.notOk(isStandardSyntaxMediaFeature("#{$value}min-width"), "scss interpolation")
  t.notOk(isStandardSyntaxMediaFeature("'min-width#{$value}'"), "scss interpolation")
  t.notOk(isStandardSyntaxMediaFeature("'#{$value}min-width'"), "scss interpolation")
  t.notOk(isStandardSyntaxMediaFeature("\"min-width#{$value}\""), "scss interpolation")
  t.notOk(isStandardSyntaxMediaFeature("\"#{$value}min-width\""), "scss interpolation")

  t.end()
})
