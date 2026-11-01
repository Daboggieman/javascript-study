// Write your solution here
function roundTrip(data) {
  if (data == null) {
    return "Empty dictionary";
  }
  const dictToJson = JSON.stringify(data);

  const jsonToDict = JSON.parse(dictToJson);

  return jsonToDict;
}

const data = { name: "Ada", tags: ["dev", "admin"], active: true };
console.log(roundTrip(data));
