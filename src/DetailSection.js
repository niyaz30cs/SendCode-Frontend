import React, { useEffect, useState } from 'react';
import { updateDetails } from './actions/formActions';
import { connect } from 'react-redux';

function DetailSection({ details, updateDetails }) {
  const [validationMessage, setValidationMessage] = useState([]);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);


  // const [details, setDetails] = useState([{ item: '', quantity: 0, price: 0 }]);

  useEffect(() => {
    setValidationMessage([]);
    setShowRequiredMessage([false])
  }, [details]);
  const isAddRowDisabled = details.some(
    (detail) => requiredFields.some((field) => !detail[field])
  )
  const requiredFields = ["item", "quantity", "price"]
  const handleAddRow = () => {
    setValidationMessage([]);
    setShowRequiredMessage(false);
    const newDetail = { item: "", quantity: 0, price: 0 }
    updateDetails([...details, newDetail]);
  };

  const handleRemoveRow = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    updateDetails(updatedDetails);
  };

  const handleDetailChange = (index, field, value) => {
    setValidationMessage([]);
    setShowRequiredMessage(false);
    if (field === "quantity" || field === "price") {
      if (isNaN(value) || value < 0) {
        setValidationMessage([
          ...validationMessage,
          `Please enter a valid positive number for ${field}`,
        ]);
        return;
      }
    }
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    updateDetails(updatedDetails);
  }

  // Implement your detail UI here

  return (
    <div>
      {details.map((detail, index) => (
        <div key={index} className="detail-row">
          <input
            type="text"
            placeholder="Item"
            value={detail.item}
            onChange={(e) => handleDetailChange(index, 'item', e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="detail-field"
            value={detail.quantity}
            onChange={(e) => handleDetailChange(index, 'quantity', parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Price"
            className="detail-field"
            value={detail.price}
            onChange={(e) => handleDetailChange(index, 'price', parseFloat(e.target.value))}
          />
          <button type="button" onClick={() => handleRemoveRow(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddRow} disabled={isAddRowDisabled}>
        Add Row
      </button>
      {
        validationMessage.length > 0 && (
          <div className='validation-message'>
            {validationMessage.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )
      }
      {
        showRequiredMessage && (
          <p className='required-message'>*All Fields are required</p>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  details: state.form.details
})

const mapDispatchToProps = {
  updateDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection);