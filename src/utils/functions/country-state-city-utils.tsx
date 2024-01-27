import { City, Country } from "country-state-city"

export const country = Country.getAllCountries()
export const countryList = country?.map((country) => {
  return {
    label: country?.name,
    value: country?.name,
  }
})
export const codemapping: { [key: string]: string } = {}
country.forEach((ctry) => {
  const name = ctry.name
  const code = ctry.isoCode

  codemapping[name] = code
})
export const getInitialCityList = (jobInfoCountry: string | undefined) => {
  let initialCityList = [{ label: "", value: "" }]

  if (jobInfoCountry) {
    const initCity = City.getCitiesOfCountry(codemapping[jobInfoCountry])
    if (initCity) {
      initialCityList = initCity.map((city1) => ({
        label: city1?.name,
        value: city1?.name,
      }))
    }
  }

  return initialCityList
}

export const handleCityOptions = (isoCode: string) => {
  const city = City.getCitiesOfCountry(isoCode)
  const cityList = city?.map((city1) => ({
    label: city1?.name,
    value: city1?.name,
  }))

  return cityList || []
}
