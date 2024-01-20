import React from 'react';

function PrintableComponent({ header, details }){
  // Implement your printable version UI here
  return (
    <div>
      <h2>Printable Voucher</h2>
      <div>
        <h3>Header Information:</h3>
        {/* Display header information */}
        <p>Field Name: {header.fieldName}</p>
        {/* Display other header fields */}
      </div>
      <div>
        <h3>Details Information:</h3>
        {/* Display details information */}
        {details.map((detail, index) => (
          <div key={index}>
            <p>Item: {detail.item}</p>
            {/* Display other detail fields */}
          </div>
        ))}
      </div>
      <button onClick={()=>window.print()}>Print Voucher</button>
    </div>
  );
};

export default PrintableComponent;