import { Stepper, Button, Group, Step, Textarea } from "@mantine/core"
import { useState } from "react"

function MyStepper(props) {
  const [binaAdi, setBinaAdi] = useState("")
  const [hasarMiktari, setHasarMiktari] = useState("")
  const [active, setActive] = useState(0)
  const nextStep = () =>
    setActive((current) => (current <= 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current >= 0 ? current - 1 : current))
  const handleChangeBinaAdi = (event) => {
    setBinaAdi(event.target.value)
  }

  const handleChangeHasarMiktari = (event) => {
    setHasarMiktari(event.target.value)
  }

  const handleComplete = () => {
    props.onComplete(binaAdi, hasarMiktari)
  }

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step">
          <Textarea value={binaAdi} onChange={handleChangeBinaAdi} />
        </Stepper.Step>
        <Stepper.Step label="Second step">
          <Textarea value={hasarMiktari} onChange={handleChangeHasarMiktari} />
        </Stepper.Step>

        <Stepper.Completed>
          <Button onClick={handleComplete}>Tamamla</Button>
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  )
}
export default MyStepper
