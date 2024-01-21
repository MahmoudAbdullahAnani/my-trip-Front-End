import { useState } from "react";
import { Combobox } from "@headlessui/react";

const people = [
  "Wade Cooper",
  "Arlene McCoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Mahmoud",
  "Mohammed",
];

function MyTestCombobox() {

  
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options>
          {filteredPeople.map((person) => (
            <Combobox.Option key={person} value={person}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </>
  );
}
export default MyTestCombobox
