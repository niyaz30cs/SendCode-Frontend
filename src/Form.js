import React, { useState } from 'react';
import { connect } from "react-redux"
import { updateHeader, updateDetails } from './actions/formActions';
import HeaderSection from './HeaderSection';
import DetailSection from './DetailSection';
import PrintableComponent from './PrintableComponent';

function Form({ header, details, updateHeader, updateDetails }) {
  const [showPrintable, setShowPrintable] = useState(false);
  const [submissionFeedBack, setSubmissionFeedback] = useState(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [currentSection,setCurrentSection]=useState("header")

  const handleSectionChange=(section)=>{
    setCurrentSection(section);
  }

  const handlePrintVoucher = () => {
    if(isPrinting) return;
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setShowPrintable(false);
    }, 2000)
  }
  // Implement your form submission logic here

  const handleClearForm = () => {
    if (isFormNotEmpty()) {
      setShowClearConfirmation(true)
    } else {
      clearForm()
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);

    setTimeout(() => {
      setIsSubmiting(false)
      setShowPrintable(true);
    }, 2000);

    const isFormValid = () => {
      const headerValues = Object.values(header);
      const detailValues = details.flatMap(detail => Object.values(detail));
      return headerValues.every(value => value !== "") && detailValues.every(value => value !== "");
    }
    // const isFormValid = Object.values(header).every((value) => value !== "") &&
    // details.every((detail) => Object.values(detail).every((value) => value !== ""))

    if (!isFormValid) {
      alert("Please fill in all required field")
      return;
    }
    try {
      await new Promise((resolve, reject) => {
        const isError = Math.random() < 0.2;
        setTimeout(() => {
          if (isError) {
            reject(new Error("Failled to save data"));
          } else {
            resolve();
          }
        }, 1000)
      });

    } catch (error) {
      console.error("Error", error);
      setSubmissionFeedback("Failled to save data. Please try again.")
    }

    setSubmissionFeedback("Saving data...")
    await new Promise(resolve => setTimeout(resolve, 1000));
    // // Save data to the database
    saveDataToDatabase({ header, details })
    setSubmissionFeedback("Data saved successfully")
    setShowPrintable(true);
  }


  const clearForm = () => {
    updateHeader({});
    updateDetails([]);
    setSubmissionFeedback(null);
    setShowPrintable(false);
    setShowClearConfirmation(false)
  }

  const isFormNotEmpty = () => {
    const headerValues = Object.values(header);
    const detailValues = details.flatMap(detail => Object.values(detail));
    return headerValues.some(value => value !== '') || detailValues.some(value => value !== '');
  };


  const saveDataToDatabase = async (FormData) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(FormData),
      })
      if (response.ok) {
        console.log("data save successfully");
        updateHeader({});
        updateDetails({});
      } else {
        console.error("failled to save data");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className="navigation-buttons">
          <button className={`navigation-buttons ${currentSection==="header"?"active":""}`} onClick={()=>handleSectionChange("header")}>header</button>
          <button className={`navigation-buttons ${currentSection==="header"?"active":""}`} onClick={()=>handleSectionChange("details")}>Details</button>
        </div>
        <div className='form-section'>
          <HeaderSection updateHeader={updateHeader} />
        </div>
        <div className='form-section'>
          {currentSection==="header"&&<HeaderSection updateHeader={updateHeader}/>}
          {currentSection==="details"&&(

          <DetailSection details={details} updateDetails={updateDetails} />
          )}
        </div>
        <button type="submit" onClick={saveDataToDatabase}>Submit</button>
        <button className='clear-form-button' type='button' onClick={handleClearForm}>Clear Form</button>
      </form>
      {showClearConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to clear the form?</p>
          <button onClick={() => setShowClearConfirmation(false)}>Cancel</button>
          <button onClick={clearForm}>Clear</button>
        </div>
      )}
      {submissionFeedBack && (
        <div className={`submission-feedback ${submissionFeedBack.include("sucessfully") ? "success-message" : "errror-message"}`}>{submissionFeedBack}</div>
      )}
      {isSubmitting && (
        <div className='loading-overlay'>
          <p>loading..</p>
        </div>
      )}
      {showPrintable && (
        <div className='printable-component'>
          {isPrinting ? (
            <div className='loading-spinner-container'>
              <p>Printing</p>
            </div>
          ) : (
            <>

              <PrintableComponent header={header} details={details} />
              <button className='printable-button' onClick={handlePrintVoucher}>Print Voucher</button>
            </>
          )
          }
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  header: state.form.header,
  details: state.form.details
})
const mapDispatchToProps = {
  updateHeader,
  updateDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);