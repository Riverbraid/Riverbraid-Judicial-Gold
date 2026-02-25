Start = (Rule / Comment / _)*

Rule = _ p:Pattern _ "=>" _ d:Decision _ "=>" _ r:Reason _ 
  { return { type: "RULE", pattern: p, decision: d, reason: r }; }

Pattern = [a-zA-Z0-9.*_]+ { return text(); }
Decision = "ALLOW" / "DENY"
Reason = [^\n\r]+ { return text().trim(); }
Comment = "#" [^\n\r]*
_ = [ \t\n\r]*
