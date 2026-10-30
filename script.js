const lengthInput=document.querySelector("#length");
const passwordInput=document.querySelector("#password")
const message=document.querySelector("#message")


const lowercaseCheckbox=document.querySelector("#lowercase")

const uppercaseCheckbox=document.querySelector("#uppercase")

const numbersCheckbox=document.querySelector("#numbers")

const symbolsCheckbox=document.querySelector("#symbols")


const generateButton=document.querySelector("#generate-button")

const copyButton=document.querySelector("#copy-Button")


const characterGroups={
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}?"
};



function randomCharacter(characters){
  const randomNumber=new Uint32Array(1);
  crypto.getRandomValues(randomNumber);

  return characters[randomNumber[0]%characters.length];

}


function shuffle(characters){
  for(let i=characters.length-1;i>0;i--){
    const randomNumber=new Uint32Array(1);
    crypto.getRandomValues(randomNumber);

    const j=randomNumber[0]%(i+1);
    [characters[i],characters[j]=characters[j],characters[i]];
  }
  return characters;
}

generateButton.addEventListener("click",()=>{
  const length=Number(lengthInput.value);
  const selectedGroups=[];


  if(lowercaseCheckbox.checked){
    selectedGroups.push(characterGroups.lowercase);

  }

  if(uppercaseCheckbox.checked){
    selectedGroups.push(characterGroups.uppercase)
  }


  if(numbersCheckbox.checked){
    selectedGroups.push(characterGroups.numbers)
  }

  if(symbolsCheckbox.checked){
    selectedGroups.push(characterGroups.symbols)
  }


  if(!Number.isInteger(length)||length<8||length>64){
    message.textContent="Choose a length from 8 to 64";
    return;
  }

  if(selectedGroups.length===0){
    message.textContent="Select at least one character type."
    return;
  }
const allCharacters=selectedGroups.join("");
const passwordCharacters=[];


for(const group of selectedGroups){
  passwordCharacters.push(randomCharacter(group));
}

while(passwordCharacters.length<length){
  passwordCharacters.push(randomCharacter(allCharacters));
}

passwordInput.value=shuffle(passwordCharacters).join("");
message.textContent="Password generated.";
});


copyButton.addEventListener("click",async ()=>{
  if(passwordInput.value===""){
    message.textContent="Generate a password first.";
    return;
  }


try{
  await navigator.clipboard.writeText(passwordInput.value);
  message.textContent="Password copied.";
}


catch{
  message.textContent="Copy failed. Select and copy the password manually.";
}
});