import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /import \{ useState, useRef, useEffect \} from "react";/,
  'import React, { useState, useRef, useEffect } from "react";'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Fixed React import.");
