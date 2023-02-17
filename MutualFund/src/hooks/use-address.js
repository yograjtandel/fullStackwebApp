import { Models } from "../data/Models";
import useActions from "./use-actions";

const UseAddress = () => {
    const fetchCountry = async () => {
        const CountryList_responce = await useActions('get', Models.County);
        const list = CountryList_responce.map((country) => {
          return { value: country.id, label: country.name };
        });
        return list;
      };
    
      const fetchState = async (country) => {
        const StateList_responce = await useActions('get', Models.State, country);
        const list = StateList_responce.map((state) => {
          return { value: state.id, label: state.name };
        });
        return list;
      };
    
      const fetchCity = async (state) => {
        const CityList_responce = await useActions('get', Models.Citiy, state);
        const list = CityList_responce.map((city) => {
          return { value: city.id, label: city.name };
        });
        return list;
      };
    return {
        fetchCountry,
        fetchState,
        fetchCity
    }
}

export default UseAddress;
