const bearFacts: Array<string> = JSON.parse("[\"1. Bears eat mostly meat and fish, but some bears also eat plants and insects.\",\"2. Canada is home to nearly 60 % of the world’s polar bears.\",\"3. The Asiatic black bear has the largest ears than other species of bears.\",\"4. Black bears can run at the speed up to 35mph.\",\"5. Baloo, from The Jungle Book, is a sloth bear.\",\"6. Katmai National Park is home to approximately 4,000 Alaskan brown bears.\",\"7. Most bears have 42 teeth.\",\"8. Grizzly bears can remember the faces of other bears.\",\"9. There are at least 600,000 black bears in North America.\",\"10. About 98% of the grizzly bear population in the U.S. lives in Alaska.\",\"11. The largest recorded polar bear weighed 1,002 kilograms.\",\"12. The Governor of Moscow trained a large bear to serve pepper Vodka to his guests.\",\"13. Polar bears primarily eat seals.\",\"14. The Sun bear has the shortest fur to keep themselves cool in the hot forests.\",\"15. Even though bears are big and heavy, they can run very fast.\",\"16. Bears are good at climbing and swimming.\",\"17. There are only eight living species of bears.\",\"18. A group of bears is called a sloth.\",\"19. Bears have a large brain and are also known as intelligent mammals.\",\"20. Bears sleep more in the winter.\",\"21. A polar bear can swim up to 100 miles without resting.\",\"22. The Koala is not a bear.\",\"23. The brown bear is Finland’s national animal.\",\"24. Asiatic bears build nests in trees.\",\"25. Unlike many mammals, bears can see in color.\",\"26. Polar bears are the largest land predators.\",\"27. The Brown bear is the national animal of Finland.\",\"28. Spectacled bears are the only wild bears that live in South America.\",\"29. Polar bears are the only bear species that are marine mammals.\",\"30. Canadian Northwest Territories License plates are shaped like polar bears.\",\"31. Bears do not urinate while they hibernate.\",\"32. Just to scratch their backs on favorite trees bears walk for miles.\",\"33. California ‘s official state animal is the California grizzly bear.\",\"34. Grizzly bears have a bite-force of over 8,000,000 pascals, which is strong enough to crush a bowling ball.\",\"35. Polar bears have eight species, American black, Asiatic black, Spectacled bears, Giant panda, Sloth bears, Sun bears and Brown bears.\",\"36. A male bear is called a boar and female is called sow.\",\"37. A bear fought in the Polish Army in WW2. He carried shells to the frontline and was taught to salute.\",\"38. Teddy bears were named after U.S. President Theodore ‘Teddy’ Roosevelt.\",\"39. A grizzly bear eats almost 20,000 calories a day.\",\"40. Bears have an excellent sense of smell, better than dogs.\"]")

export function randomFact(): string {
  const randIndex = Math.floor(Math.random() * bearFacts.length)
  return bearFacts[randIndex]
}

export default bearFacts
