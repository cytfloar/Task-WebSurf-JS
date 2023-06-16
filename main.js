async function showOffer(sec, keys, move = false) {
    clearScreen()
    newInstruction(INSTD.format(sec), {y: -0.3})
    newImage(SKIP, {style: {
      width: "200px", height: "150px"}, x: 0.3, y: 0.45})
    newImage(STAY, {style: {
      width: "200px", height: "150px"}, x: -0.3, y: 0.45})
    newImage(PRACLOGO, {style: {
      width: "150px", height: "150px"}, y: -0.6})
    var bar = newProgressBar(5.0, {y: -0.05});
    await KeyPress(keys)
}

  async function main() {
    await manyInstructions([INSTA, INSTB, INSTC])
    await showOffer(5.0, 'Digit2')
    clearScreen()
    newInstruction(INSTF)
    clearScreen()
    for (var i = 0; i < 4; ++ i) {
      var number = randint(1, 4)
      newInstruction(number, {
        style: { fontSize: "70px" },
        x: uniform(-0.8, 0.8),
        y: uniform(-0.8, 0.8)
      }) 5
      await KeyPress("Digit" + number)
      clearScreen()
    }
    newInstruction(INSTG)
    await KeyPress('Space')
    clearScreen()
    await showOffer(5.0, 'Digit1')
    var bar = newProgressBar(5.0, {y: -0.05});
    bar()
    await KeyPress("Digit2")
    await Timer(5.0)
    clearScreen()
    newInstruction("init");
    await KeyPress("Space")
    clearScreen()
    newImage("images/Art.png", {y: -0.5})
    newVideo("ART1.mp4")
    var t = await KeyPress("Space")
    console.log(`${JSON.stringify(t)}`)
    clearScreen()
    newInstruction("This will appear for 1 second")
    await Timer(1)
    clearScreen()
    newInstruction("Ended")
  }

main()
