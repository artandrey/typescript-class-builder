---
'class-constructor': patch
---

Change builder creation process: switch from Object.create to Object.setPrototypeOf to increase performance. Update documentation: add note about useDefineForClassFields property in tsconfig
