let web3;
let contract;

const contractAddress = "0xd1FAE79B0E9C780B28A0080E10D0832F18856b98";
const abi = [
  {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_diseaseName",
				"type": "string"
			}
		],
		"name": "addChronicDisease",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_diseaseName",
				"type": "string"
			}
		],
		"name": "addTemporaryDisease",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setPatientInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getChronicDiseases",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "diagnosedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct PatientMedicalRecordByID.Disease[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getPatientInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getTemporaryDiseases",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "diagnosedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct PatientMedicalRecordByID.Disease[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log("เชื่อม MetaMask แล้ว");
  } else {
    alert("ต้องติดตั้ง MetaMask");
  }
});

// บันทึกผู้ป่วย
async function setPatient() {
  const acc = (await web3.eth.getAccounts())[0];
  await contract.methods.setPatientInfo(
    parseInt(pId.value),
    pName.value,
    parseInt(pAge.value)
  ).send({ from: acc });
  alert("บันทึกผู้ป่วยแล้ว");
}

// เพิ่มโรคประจำตัว
async function addChronic() {
  const acc = (await web3.eth.getAccounts())[0];
  await contract.methods.addChronicDisease(
    parseInt(cId.value),
    cName.value
  ).send({ from: acc });
  alert("เพิ่มโรคประจำตัวแล้ว");
}

// เพิ่มโรคชั่วคราว
async function addTemporary() {
  const acc = (await web3.eth.getAccounts())[0];
  await contract.methods.addTemporaryDisease(
    parseInt(tId.value),
    tName.value
  ).send({ from: acc });
  alert("เพิ่มโรคชั่วคราวแล้ว");
}

// ดูข้อมูลผู้ป่วย
async function getPatient() {
  const id = parseInt(gId.value);

  const info = await contract.methods.getPatientInfo(id).call();
  const chronic = await contract.methods.getChronicDiseases(id).call();
  const temp = await contract.methods.getTemporaryDiseases(id).call();

  let text = `ชื่อ: ${info[0]} | อายุ: ${info[1]}\n\n`;

  text += "โรคประจำตัว:\n";
  if (chronic.length === 0) text += "- ไม่มี\n";
  else chronic.forEach((d,i)=> text += `${i+1}. ${d.name}\n`);

  text += "\nโรคชั่วคราว:\n";
  if (temp.length === 0) text += "- ไม่มี\n";
  else temp.forEach((d,i)=> text += `${i+1}. ${d.name}\n`);

  result.innerText = text;
}
async function addTemporary() {
  const acc = (await web3.eth.getAccounts())[0];
  await contract.methods.addTemporaryDisease(
    parseInt(tId.value),
    tName.value
  ).send({ from: acc });

  alert("เพิ่มโรคชั่วคราวแล้ว");
}
