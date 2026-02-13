import { createContext } from "react";

export const AppContext = createContext()
const AppContextProvider = (props) => {
    const currency='$'
   const calculateAge = (dob) => {
  if (!dob) return "—";

  const today = new Date();
  const birthDate = new Date(dob);

  // If future date selected
  if (birthDate > today) return "Invalid";

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't happened yet this year
  if (
    monthDiff < 0 || 
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  // Extra safety check
  if (age < 0 || age > 120) return "Invalid";

  return age;
};
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }
    const value = {
        calculateAge,
        slotDateFormat,
        months,currency

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider