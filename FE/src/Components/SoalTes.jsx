import React, { useEffect, useState } from "react";
import axios from "axios";

const SoalTes = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questions, setQuestions] = useState([]);

  const handleOptionChange = (questionId, optionId) => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[questionId] = optionId;

    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await axios.get(
          "https://pendaftaransiswasekolah.000webhostapp.com/question.php"
        );
        if (response.status === 200) {
          setQuestions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuestion();
  }, []);

  const getResult = () => {
    const correctQuestions = questions.filter((question) => {
      return question.correctAnswer === selectedOptions[question.id];
    });
    return correctQuestions.length * 5;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const nisn = JSON.parse(localStorage.getItem("dataSementara")).nisn;

      formData.append("nisn", nisn);
      formData.append("hasil", getResult());
      formData.append(
        "status_pendaftaran",
        getResult() > 80 ? "Diterima" : "Ditolak"
      );

      const response = await axios.post(
        "https://pendaftaransiswasekolah.000webhostapp.com/question.php",
        formData
      );

      if (response.status === 200) {
        window.location.reload()
        localStorage.setItem("status", 4);
      }
    } catch (error) {
      console.log("terjadi kesalahan saat mengirim data tes soal : " + error);
    }
  };

  return (
    <div>
      <ul>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          {questions.map((question) => (
            <li
              key={question.id}
              className="m-5 mb-10 p-5 card bg-base-100 w-full shadow-xl"
            >
              <h3 className="text-xl mb-5">{question.text}</h3>
              {question.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionChange(question.id, option.id)}
                  className="text-lg"
                >
                  <input
                    className="my-3"
                    type="radio"
                    value={option.id}
                    onChange={() => {}}
                    checked={selectedOptions[question.id] === option.id} // Periksa apakah opsi dipilih untuk pertanyaan tertentu
                  />{" "}
                  <label htmlFor={option.id}>
                    {option.id}. {option.text}
                  </label>
                </div>
              ))}
            </li>
          ))}
          <button
            type="submit"
            className="btn flex ml-auto w-28 btn-primary m-5 "
          >
            Submit
          </button>
        </form>
      </ul>
    </div>
  );
};

export default SoalTes;
