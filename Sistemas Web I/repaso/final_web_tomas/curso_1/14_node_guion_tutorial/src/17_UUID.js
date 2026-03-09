import {v1 , v3, v4, v5 } from "uuid";

for (let x = 0; x < 3; x++) {
    const uuidv1 = v1();
    const uuidv3 = v3("Tomas", v3.DNS);
    const uuidv4 = v4();
    const uuidv5 = v5("Tomas", v5.URL);

    console.log(`v1: ${uuidv1}`);
    console.log(`v3: ${uuidv3}`);
    console.log(`v4: ${uuidv4}`);
    console.log(`v5: ${uuidv5}`);
}