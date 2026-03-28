start = expression

expression = left:term _ "+" _ right:expression {
  return { type: "addition", left, right };
} / term

term = [0-9]+ {
  return { type: "literal", value: parseInt(text(), 10) };
}

_ "whitespace" = [ \t\n\r]*
