import { React, useState } from "react";
import "./Form.css";


  
  
const initialState = {
  name: " ",
  email: "",
  subject: "",
  message: "",
};

const VALIDATION = {
  email: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Needs to be an email.",
    },
  ],
};

export const LoginForm = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);


  var jsonData1 = {

    "id": 1,
    "name": "Dan Oje",
    "email": "test@test.com",
    "subject": "test subject",
    "message": "test message"

  }

  var jsonData2 = {
    
    "id": 2,
    "name": "Tun Oje",
    "email": "test2@test.com",
    "subject": "test2 subject",
    "message": "test2 message"
    
  }

  

  const getErrorFields = (form) =>
    Object.keys(form).reduce((acc, key) => {
      if (!VALIDATION[key]) return acc;

      const errorsPerField = VALIDATION[key]
        // get a list of potential errors for each field
        // by running through all the checks
        .map((validation) => ({
          isValid: validation.isValid(form[key]),
          message: validation.message,
        }))
        // only keep the errors
        .filter((errorPerField) => !errorPerField.isValid);
        

      return { ...acc, [key]: errorsPerField };
    }, {});

    const handleClick = () => {
      if (setForm >=1) {
        <div>alert("submitted")</div>
      } else{
        <div> fill</div>
      }

      var formData = new FormData();
    formData.append('json1', JSON.stringify(jsonData1));
    formData.append('json2', JSON.stringify(jsonData2));

    // Send data to the backend via POST
    fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries/', {

      method: 'POST', 
      mode: 'cors', 
      body: formData // body data type must match "Content-Type" header

    })
    }
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  let handleSubmit = async (event) => {
    alert("submitted")
    event.preventDefault();
    setForm(initialState);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

   
  };


  const errorFields = getErrorFields(form);

  return (
    <>
    <h3 style={{textAlign: "center"}}> CONTACT US </h3>
    {submitting &&
        <div>Submtting Form...</div>
      }
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          required
          value={form.email}
          onChange={handleChange}
        />
        {errorFields.email?.length ? (
          <div style={{ color: "red" }}>{errorFields.email[0].message}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          type="text"
          required
          value={form.message}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" onClick={handleClick}>Submit</button>
        
    </form>
    </>
  );
};

