let persona = {"nombre": "Juan", "edad": 23};
console.log("Persona:\n", persona);
let text = JSON.stringify(persona);
console.log("\nText:\n", text);
let obj = JSON.parse(text);
console.log("\nObj:\n", obj);
console.log("\nKeys:");

for(let key in obj) {
    console.log("key:"+ key +", value:"+ obj[key]);
}
console.log("\nStringify:\n", JSON.stringify(persona, null, 2));

/*
Persona:
 { nombre: 'Juan', edad: 23 }

Text:
 {"nombre":"Juan","edad":23}

Obj:
 { nombre: 'Juan', edad: 23 }

Keys:
key:nombre, value:Juan
key:edad, value:23

Stringify:
 {
  "nombre": "Juan",
  "edad": 23
}
*/