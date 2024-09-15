import { useEffect, useState } from "react";
import ChangeDataInput from "./ChangeDataInput";
import TextUpdateDataError from "./TextUpdateDataError";
import { useAuth } from "../hook/use-auth";
import { updateDataSchema } from "../validate/validate";
import axios from "../config/axios";

const validateUpdateUser = (input) => {
  const { error } = updateDataSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function UpdateDataForm({ onSuccess, userId }) {
  const [inputUpdateData, setInputUpdateData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    tel: "",
    age: "",
    sex: "",
    nationality: "",
    address: "",
    pinMapGps: "",
  });
  const [error, setError] = useState({});
  const { updateUserData } = useAuth();

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((res) => {
        setInputUpdateData({
          ...inputUpdateData,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          nickName: res.data.user.nickName,
          tel: res.data.user.tel,
          age: res.data.user.age,
          sex: res.data.user.sex,
          nationality: res.data.user.nationality,
          address: res.data.user.address,
          pinMapGps: res.data.user.pinMapGps,
        });
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const handleChangeInput = (e) => {
    setInputUpdateData({
      ...inputUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = validateUpdateUser(inputUpdateData);
    if (result) {
      setError(result);
    } else {
      try {
        await updateUserData(inputUpdateData);

        setError({});
        onSuccess();
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError({ message: error.response.data.message });
        } else {
          setError({ message: "An error occurred. Please try again later." });
        }
        console.log(error);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-3 p-4 h-[80vh] overflow-y-auto"
      onSubmit={handleSubmitForm}
    >
      <ChangeDataInput
        placeholder="FirstName"
        name="firstName"
        onChange={handleChangeInput}
        value={inputUpdateData.firstName}
        hasError={error.firstName}
      />
      {error.firstName && <TextUpdateDataError message={error.firstName} />}
      <ChangeDataInput
        placeholder="LastName"
        name="lastName"
        value={inputUpdateData.lastName}
        onChange={handleChangeInput}
        hasError={error.lastName}
      />

      {error.lastName && <TextUpdateDataError message={error.lastName} />}
      <ChangeDataInput
        placeholder="NickName"
        name="nickName"
        onChange={handleChangeInput}
        value={inputUpdateData.nickName}
        hasError={error.nickName}
      />

      {error.nickName && <TextUpdateDataError message={error.nickName} />}
      <ChangeDataInput
        placeholder="Tel"
        name="tel"
        onChange={handleChangeInput}
        value={inputUpdateData.tel}
        hasError={error.tel}
      />

      {error.tel && <TextUpdateDataError message={error.tel} />}
      <ChangeDataInput
        placeholder="Age"
        name="age"
        onChange={handleChangeInput}
        value={inputUpdateData.age}
        hasError={error.age}
      />

      {error.age && <TextUpdateDataError message={error.age} />}
      <ChangeDataInput
        placeholder="Sex your can specify only Male,Female,Thirdgender"
        name="sex"
        onChange={handleChangeInput}
        value={inputUpdateData.sex}
        hasError={error.sex}
      />

      {error.sex && <TextUpdateDataError message={error.sex} />}
      <ChangeDataInput
        placeholder="Nationality"
        name="nationality"
        onChange={handleChangeInput}
        value={inputUpdateData.nationality}
        hasError={error.nationality}
      />
      {error.nationality && <TextUpdateDataError message={error.nationality} />}
      <ChangeDataInput
        placeholder="Address"
        name="address"
        onChange={handleChangeInput}
        value={
          inputUpdateData.address === ""
            ? inputUpdateData.address
            : inputUpdateData.address
        }
      />
      <ChangeDataInput
        placeholder="YourMapGps"
        name="pinMapGps"
        onChange={handleChangeInput}
        value={inputUpdateData.pinMapGps}
      />
      <ChangeDataButton />
    </form>
  );
}

export function ChangeDataButton() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-3 py-2 mb-2"
      >
        Changeyourdata
      </button>
    </div>
  );
}
