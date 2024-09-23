//일일 박스오피스 api 용 getDays function

export function getDateTime(){
    const DateObj = new Date();

    const Years = String(DateObj.getFullYear());
    const Dates = String(DateObj.getDate() - 1);

    const getMonth = () => {
        const month = DateObj.getMonth() + 1;
        if(month < 10){
            return "0" + String(month);
        } else {
            return String(month);
        }
    };

    const FullDates = Years + getMonth() + Dates;

    return FullDates;
}