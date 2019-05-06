# Taber Code
My own programming language that I made. Its cool and stuff.

#Getting set up

In the first line of the linereader.js file you need to replace the "doc.txt" with whatever file path you need to analyze and run. Thats pretty much it, just run the entire file. 

#Base Syntax

- Commands start with ">". You can only write one command per line.
- Comments can be made by starting with "//" (No quotes)

#Commands:

>say

- Say text or a varible. Surround text with ""
- Simply type a variable to say it 
- Variables and strings cannot yet be combined
- Examples:
  - >say "hello"
  - >say x


>moveto

-Move to a line
-Example:
  - >moveto 10


>end
 
 -end the program early


>var

- Assign a variable to a string only (text will be interpreted as a string)
- Syntax: >var X = string (no quotes)
  -Spacing is key in this command. Or else you will get a illegial variable assignment.
- Examples:
  - >var x = hi
  - >var x = 1
  
 
#Errors:

- Is not defined: You used a variable in >say but the variable is not defined
- Cannot assign a variable to a command: You assigned a variable with a > in it
- Illegal variable assignment: Bad >var syntax
- Imput was given with no command: You typed ">" on a line but gave no command
- Invalid syntax: You gotta type > before a command
- Illegal line movement: You used the >moveto command that directs to a non-existing line
- Illegal line read: Something got borked in the interpreter
- CRITICAL PROCESS DIED: Prepare yourself for rage... You really messed something up


