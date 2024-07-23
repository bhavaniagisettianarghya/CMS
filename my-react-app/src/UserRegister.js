// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Modal } from "@mui/material";
// import "./UserRegister.css";
// import { Container, Form, Button, Alert } from "react-bootstrap";

// function UserRegister() {
//   const [user, setUser] = useState({
//     fullName: "",
//     familyName: "",
//     dateOfBirth: "",
//     gender: "",
//     age: "",
//     profession: "",
//     email: "",
//     phoneNumber: "",
//     disability: "",
//     nationality: "",
//     landmark: "",
//     maritalStatus: "",
//     husbandWifeName: "",
//     fatherName: "",
//     motherName: "",
//     subscription: "",
//     subscriptionDuration: "",
//     subscriptionStartDate: new Date().toISOString().split("T")[0],
//     subscriptionEndDate: "",
//     price: "",
//     discount: "",
//     paidAmount: "",
//     profilePic: null,
//     paymentMethod: "",
//     upiNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//   });

//   const [errors, setErrors] = useState({});
//   const params = useParams();
//   const churchId = params.churchId;
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [upiNumber, setUpiNumber] = useState(null);
//   const [expirationDate, setExpirationDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [addressData, setAddressData] = useState(null);
//   const [paymentStatus, setpaymentStatus] = useState("success");

//   const validateForm = () => {
//     let isValid = true;
//     setShowPaymentModal(true);
//     const newErrors = {};

//     if (!/^[a-zA-Z\s]+$/.test(user.fullName)) {
//       newErrors.fullName = "Please enter a valid full name";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.familyName)) {
//       newErrors.familyName = "Please enter a valid family name";
//       isValid = false;
//     }

//     if (!user.dateOfBirth) {
//       newErrors.dateOfBirth = "Please select a date of birth";
//       isValid = false;
//     }

//     if (!user.gender) {
//       newErrors.gender = "Please select a gender";
//       isValid = false;
//     }

//     if (!user.profession) {
//       newErrors.profession = "Please select a profession";
//       isValid = false;
//     }

//     if (
//       !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(user.email)
//     ) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     if (!/^[6-9]\d{9}$/.test(user.phoneNumber)) {
//       newErrors.phoneNumber =
//         "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//       isValid = false;
//     }

//     if (user.disability !== "Yes" && user.disability !== "No") {
//       newErrors.disability = "Please select Yes or No for disability";
//       isValid = false;
//     }

//     if (!user.subscription) {
//       newErrors.subscription = "Please select a subscription type";
//       isValid = false;
//     }

//     if (!user.profilePic) {
//       newErrors.profilePic = "Please upload a image";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.landmark)) {
//       newErrors.landmark = "Please enter a valid land mark";
//       isValid = false;
//     }

//     if (!user.maritalStatus) {
//       newErrors.maritalStatus = "Please select a marital status";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleOpenPaymentModal = () => {
//     setShowPaymentModal(true);
//   };

//   const handleClosePaymentModal = () => {
//     setShowPaymentModal(false);
//   };

//   const generateTransactionId = () => {
//     return Math.random().toString(36).substring(7);
//   };

//   var [alldata, setAlldata] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     setAlldata = user[0];
//     if (validateForm()) {
//       try {
//         console.log(user.paymentMethod);
//         const formData = new FormData();
//         formData.append("file", user.profilePic);
//         formData.append("fullName", user.fullName);
//         formData.append("familyName", user.familyName);
//         formData.append("dateOfBirth", user.dateOfBirth);
//         formData.append("gender", user.gender);
//         formData.append("age", user.age);
//         formData.append("profession", user.profession);
//         formData.append("email", user.email);
//         formData.append("phoneNumber", user.phoneNumber);
//         formData.append("disability", user.disability);
//         formData.append("nationality", user.nationality);
//         formData.append("landmark", user.landmark);
//         formData.append("maritalStatus", user.maritalStatus);
//         formData.append("husbandWifeName", user.husbandWifeName);
//         formData.append("fatherName", user.fatherName);
//         formData.append("motherName", user.motherName);
//         formData.append("subscription", user.subscription);
//         formData.append("subscriptionDuration", user.subscriptionDuration);
//         formData.append("subscriptionStartDate", user.subscriptionStartDate);
//         formData.append("subscriptionEndDate", user.subscriptionEndDate);
//         formData.append("price", user.price);
//         formData.append("discount", user.discount);
//         formData.append("paidAmount", user.paidAmount);
//         formData.append("churchId", churchId);
//         formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//         formData.append("cardNumber", user.cardNumber); // Added cardNumber
//         formData.append("upiNumber", user.upiNumber); // Added upiNumber
//         formData.append("expirationDate", user.expirationDate); // Added expirationDate
//         formData.append("cvv", user.cvv);

//         const response = await axios.post(
//           "http://localhost:9001/savePerson",
//           formData
//         );
//         console.log("Response:", response.data);
//         console.log("Church ID:", churchId);
//         const userid = localStorage.setItem("userid", response.data.id);
//       } catch (error) {
//         console.error("Error:", error);
//         setError(
//           "An error occurred while processing your request. Please try again later."
//         );
//       }
//     }
//   };

//   const submitCard = async (e) => {
//     console.log(alldata);
//     try {
//       // const formData = new FormData();
//       // formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//       // console.log(formData);
//       const userid = localStorage.getItem("userid");
//       const data = {
//         paymentMethod,
//         paymentStatus,
//       };
//       const response = await axios.put(
//         `http://localhost:9001/updateUser/${user}`,
//         data
//       );
//       console.log(response);
//       alert("payment success");
//     } catch (error) {
//       alert("some error occured");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubscriptionChange = (e) => {
//     setUser({ ...user, subscription: e.target.value });
//   };

//   const handleSubscriptionDurationChange = (e) => {
//     const duration = parseInt(e.target.value);
//     const pricePerYear = 3650; // Assuming the price per year is 3650 units
//     const discountPercentage = 0.9; // Assuming the discount is 90%
//     const price = duration * pricePerYear;
//     const discount = price * discountPercentage;
//     const paidAmount = price - discount;

//     setUser((prevUser) => ({
//       ...prevUser,
//       subscriptionDuration: duration,
//       subscriptionEndDate: calculateSubscriptionEndDate(
//         user.subscriptionStartDate,
//         duration
//       ),
//       price,
//       discount,
//       paidAmount,
//     }));
//   };

//   const calculateSubscriptionEndDate = (startDate, duration) => {
//     if (startDate && duration) {
//       const start = new Date(startDate);
//       const end = new Date(start.getTime());
//       end.setFullYear(end.getFullYear() + duration);
//       return end.toISOString().split("T")[0];
//     }
//     return "";
//   };

//   const handleSubscriptionStartDateChange = (e) => {
//     const startDate = e.target.value;
//     setUser({ ...user, subscriptionStartDate: startDate });
//     calculateSubscriptionEndDate(startDate, user.subscriptionDuration); // Pass startDate directly
//   };

//   const calculateAge = (dob) => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleDateOfBirthChange = (e) => {
//     const dob = e.target.value;
//     setUser({ ...user, dateOfBirth: dob, age: calculateAge(dob) });
//   };

//   const handleMaritalStatusChange = (e) => {
//     const status = e.target.value;
//     setUser({
//       ...user,
//       maritalStatus: status,
//       husbandWifeName: status === "Married" ? user.husbandWifeName : "",
//       fatherName: status === "Unmarried" ? user.fatherName : "",
//       motherName: status === "Unmarried" ? user.motherName : "",
//     });
//   };

//   const getClassName = (fieldName) => {
//     return errors[fieldName] ? "input-error" : "input-valid";
//   };

//   return (
//     <section className="Registerform">
//       <form onSubmit={handleSubmit}>
//         <div className="form-container">
//           <div className="">
//             <h2>Registration Form</h2>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "100%" }}>
//                 <label>
//                   Full Name:
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={user.fullName}
//                     onChange={handleChange}
//                     className={getClassName("fullName")}
//                     style={{ height: "6vh", borderRadius: "0.4rem" }}
//                   />
//                 </label>
//                 {errors.fullName && (
//                   <span className="error">{errors.fullName}</span>
//                 )}
//               </div>
//               <div style={{ marginLeft: "5%" }}>
//                 <label style={{ width: "120%" }}>
//                   Family Name:
//                   <input
//                     type="text"
//                     name="familyName"
//                     value={user.familyName}
//                     onChange={handleChange}
//                     className={getClassName("familyName")}
//                     style={{ height: "6vh", borderRadius: "0.4rem" }}
//                   />
//                 </label>
//                 {errors.familyName && (
//                   <span className="error">{errors.familyName}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <label>
//                   Date of Birth:
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={user.dateOfBirth}
//                     onChange={handleDateOfBirthChange}
//                     className={getClassName("dateOfBirth")}
//                     style={{
//                       height: "6vh",
//                       width: "114%",
//                       borderRadius: "0.4rem",
//                       marginTop: "-0.2%",
//                     }}
//                   />
//                 </label>
//                 {errors.dateOfBirth && (
//                   <span className="error">{errors.dateOfBirth}</span>
//                 )}
//               </div>
//               <div>
//                 <label>Gender:</label>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="male"
//                       checked={user.gender === "male"}
//                       onChange={handleChange}
//                     />
//                     Male
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="female"
//                       checked={user.gender === "female"}
//                       onChange={handleChange}
//                     />
//                     Female
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="others"
//                       checked={user.gender === "others"}
//                       onChange={handleChange}
//                     />
//                     Others
//                   </label>
//                 </div>
//                 {errors.gender && (
//                   <span className="error">{errors.gender}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div>
//                 <label>
//                   Age:
//                   <input
//                     type="number"
//                     name="age"
//                     value={user.age}
//                     onChange={handleChange}
//                     disabled
//                     style={{ width: "90%", height: "6vh" }}
//                   />
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   Profession:
//                   <select
//                     name="profession"
//                     value={user.profession}
//                     onChange={handleChange}
//                     className={getClassName("profession")}
//                     style={{
//                       width: "122%",
//                       height: "6vh",
//                       marginTop: "2%",
//                       marginLeft: "-2%",
//                     }}
//                   >
//                     <option value=""></option>
//                     <option value="job">Job</option>
//                     <option value="job">Student</option>
//                     <option value="business">Business</option>
//                     <option value="other">other</option>
//                   </select>
//                 </label>
//                 {errors.profession && (
//                   <span className="error">{errors.profession}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div>
//                 <label>
//                   Email:
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     className={getClassName("email")}
//                     style={{
//                       width: "113%",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                     }}
//                   />
//                 </label>
//                 {errors.email && <span className="error">{errors.email}</span>}
//               </div>
//               <div>
//                 <label style={{ marginLeft: "22%" }}>
//                   Phone Number:
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={user.phoneNumber}
//                     onChange={handleChange}
//                     className={getClassName("phoneNumber")}
//                     style={{
//                       marginLeft: "-1.5%",
//                       height: "6vh",
//                       width: "121%",
//                       borderRadius: "0.4rem",
//                     }}
//                   />
//                 </label>
//                 {errors.phoneNumber && (
//                   <span className="error">{errors.phoneNumber}</span>
//                 )}
//               </div>
//             </div>
//             <label>
//               Disability:
//               <input
//                 type="text"
//                 name="disability"
//                 value={user.disability}
//                 onChange={handleChange}
//                 className={getClassName("disability")}
//               />
//             </label>
//             {errors.disability && (
//               <span className="error">{errors.disability}</span>
//             )}

//             <label>
//               Nationality:
//               <input
//                 type="text"
//                 name="nationality"
//                 value={user.nationality}
//                 onChange={handleChange}
//                 className={getClassName("nationality")}
//               />
//             </label>
//             {errors.nationality && (
//               <span className="error">{errors.nationality}</span>
//             )}

//             <label>
//               Landmark:
//               <input
//                 type="text"
//                 name="landmark"
//                 value={user.landmark}
//                 onChange={handleChange}
//                 className={getClassName("familyName")}
//               />
//             </label>
//             {errors.landmark && (
//               <span className="error">{errors.landmark}</span>
//             )}

//             <label>
//               Marital Status:
//               <select
//                 value={user.maritalStatus}
//                 onChange={handleMaritalStatusChange}
//                 className={getClassName("maritalStatus")}
//                 name="maritalStatus"
//               >
//                 <option value="none"></option>
//                 <option value="Married">Married</option>
//                 <option value="Unmarried">Unmarried</option>
//               </select>
//               {errors.maritalStatus && (
//                 <span className="error">{errors.maritalStatus}</span>
//               )}
//             </label>

//             {user.maritalStatus === "Married" && (
//               <label>
//                 Husband/Wife Name:
//                 <input
//                   type="text"
//                   name="husbandWifeName"
//                   value={user.husbandWifeName}
//                   onChange={handleChange}
//                   className={getClassName("husbandWifeName")}
//                 />
//               </label>
//             )}
//             {user.maritalStatus === "Unmarried" && (
//               <div>
//                 <label>
//                   Father's Name:
//                   <input
//                     type="text"
//                     name="fatherName"
//                     value={user.fatherName}
//                     onChange={handleChange}
//                     className={getClassName("fatherName")}
//                   />
//                 </label>
//                 <label>
//                   Mother's Name:
//                   <input
//                     type="text"
//                     name="motherName"
//                     value={user.motherName}
//                     onChange={handleChange}
//                     className={getClassName("motherName")}
//                   />
//                 </label>
//               </div>
//             )}
//             <label>
//               Subscription Type:
//               <select
//                 value={user.subscription}
//                 className={getClassName("subscription")}
//                 onChange={handleSubscriptionChange}
//               >
//                 <option value="Select an option"></option>
//                 <option value="Free">Free</option>
//                 <option value="Premium">Premium</option>
//               </select>
//             </label>
//             {errors.subscription && (
//               <span className="error">{errors.subscription}</span>
//             )}

//             <label>
//               Subscription Duration:
//               <select
//                 value={user.subscriptionDuration}
//                 onChange={handleSubscriptionDurationChange}
//                 className={getClassName("subscriptionDuration")}
//               >
//                 <option value={0}> Select an Option</option>
//                 <option value={1}>1 year</option>
//                 <option value={2}>2 years</option>
//                 <option value={5}>5 years</option>
//               </select>
//             </label>

//             <label>
//               Subscription Start Date:
//               <input
//                 type="date"
//                 name="subscriptionStartDate"
//                 value={user.subscriptionStartDate}
//                 onChange={handleSubscriptionStartDateChange}
//               />
//             </label>
//             <label>
//               Subscription End Date:
//               <input
//                 type="date"
//                 name="subscriptionEndDate"
//                 value={user.subscriptionEndDate}
//                 readOnly
//               />
//             </label>

//             <label>
//               Price:
//               <input
//                 type="number"
//                 name="price"
//                 value={user.price}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Discount:
//               <input
//                 type="number"
//                 name="discount"
//                 value={user.discount}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Final Price:
//               <input
//                 type="number"
//                 name="paidAmount"
//                 value={user.paidAmount}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Profile Picture:
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="profilePic"
//                 onChange={(e) =>
//                   setUser({ ...user, profilePic: e.target.files[0] })
//                 }
//                 className={getClassName("profilePic")}
//               />
//             </label>
//             {errors.profilePic && (
//               <span className="error">{errors.profilePic}</span>
//             )}

//             <button type="submit">Register</button>
//           </div>
//         </div>

//         <Modal
//           open={showPaymentModal}
//           onClose={() => setShowPaymentModal(false)}
//         >
//           <div className="container" style={{ marginTop: "-5%" }}>
//             <div className="row">
//               <div className="col-6">
//                 <Container
//                   className="payment-container w-100"
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     borderRadius: "15px",
//                     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                     width: "40%",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ display: "flex", marginLeft: "-40%" }}>
//                     <div>
//                       <h2
//                         className="payment-heading-center"
//                         style={{
//                           color: "black",
//                           marginLeft: "-15%",
//                           marginRight: "-200%",
//                         }}
//                       >
//                         Payment Details
//                       </h2>
//                     </div>
//                     <div style={{ marginLeft: "70%", marginRight: "-150%" }}>
//                       {success && (
//                         <Button
//                           className="mt-4"
//                           variant="primary"
//                           style={{ marginLeft: "37%", borderRadius: "2rem" }}
//                         >
//                           Print Receipt
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                   <br />
//                   <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="paymentMethod">
//                       <Form.Label
//                         style={{ marginLeft: "1%", fontSize: "1.2rem" }}
//                       >
//                         Select Payment Method
//                       </Form.Label>{" "}
//                       <br />
//                       <Form.Control
//                         as="select"
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         name="paymentMethod"
//                         required
//                         style={{ marginLeft: "5%" }}
//                       >
//                         <option value="" disabled>
//                           {" "}
//                           <br />
//                           Select Payment Method
//                         </option>
//                         <option value="credit_card">Credit Card</option>
//                         <option value="debit_card">Debit Card</option>
//                         <option value="upi">UPI</option>
//                         <option value="razorpay">Razorpay</option>
//                         <option value="cash_on_delivery">
//                           Cash On Delivery
//                         </option>
//                       </Form.Control>
//                     </Form.Group>{" "}
//                     <br />
//                     {user.paymentMethod === "upi" && (
//                       <Form.Group controlId="upiNumber">
//                         <Form.Label
//                           style={{ marginLeft: "7%", fontSize: "1.2rem" }}
//                         >
//                           UPI Number
//                         </Form.Label>{" "}
//                         <br />
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter UPI Number"
//                           //   value={upiNumber}
//                           //   onChange={(e) => setUpiNumber(e.target.value)}
//                           name="upiNumber"
//                           value={user.upiNumber}
//                           onChange={handleChange}
//                           required
//                           style={{ marginLeft: "5%" }}
//                         />
//                       </Form.Group>
//                     )}
//                     {user.paymentMethod !== "upi" &&
//                       user.paymentMethod !== "cash_on_delivery" && (
//                         <>
//                           <Form.Group controlId="cardNumber">
//                             <Form.Label
//                               style={{ marginLeft: "6%", fontSize: "1.2rem" }}
//                             >
//                               Card Number
//                             </Form.Label>{" "}
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter card number"
//                               value={user.cardNumber}
//                               onChange={handleChange}
//                               name="cardNumber"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>{" "}
//                           <br />
//                           <Form.Group controlId="expirationDate">
//                             <Form.Label
//                               style={{ marginLeft: "3%", fontSize: "1.2rem" }}
//                             >
//                               Expiration Date
//                             </Form.Label>
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="MM/YY"
//                               value={user.expirationDate}
//                               onChange={handleChange}
//                               name="expirationDate"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>{" "}
//                           <br />
//                           <Form.Group controlId="cvv">
//                             <Form.Label
//                               style={{ marginLeft: "2%", fontSize: "1.2rem" }}
//                             >
//                               CVV
//                             </Form.Label>{" "}
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter CVV"
//                               value={user.cvv}
//                               onChange={handleChange}
//                               name="cvv"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>
//                         </>
//                       )}
//                     {user.paymentMethod === "cash_on_delivery" && (
//                       <div style={{ marginLeft: "5%" }}>
//                         <Alert variant="warning">
//                           Cash On Delivery selected
//                         </Alert>
//                       </div>
//                     )}
//                     <br />
//                     <div className="payment-heading-center">
//                       <Button
//                         onClick={submitCard}
//                         className="mt-4"
//                         variant="primary"
//                         type="submit"
//                         disabled={loading}
//                         style={{ marginLeft: "5%" }}
//                       >
//                         {loading ? "Processing..." : "Submit Payment"}
//                       </Button>
//                     </div>{" "}
//                     <br />
//                     {error && (
//                       <Alert
//                         variant="danger"
//                         style={{ color: "red", marginLeft: "32%" }}
//                       >
//                         {error}
//                       </Alert>
//                     )}{" "}
//                     {/* Display error alert */}
//                     {success && (
//                       <Alert
//                         variant="success"
//                         style={{ color: "green", marginLeft: "5%" }}
//                       >
//                         Payment successful!
//                       </Alert>
//                     )}
//                   </Form>
//                 </Container>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </form>
//     </section>
//   );
// }

// export default UserRegister;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Modal } from "@mui/material";
// import "./UserRegister.css";
// import { Container, Form, Button, Alert } from "react-bootstrap";

// function UserRegister() {
//   const [user, setUser] = useState({
//     fullName: "",
//     familyName: "",
//     dateOfBirth: "",
//     gender: "",
//     age: "",
//     profession: "",
//     email: "",
//     phoneNumber: "",
//     disability: "",
//     nationality: "",
//     landmark: "",
//     maritalStatus: "",
//     husbandWifeName: "",
//     fatherName: "",
//     motherName: "",
//     subscription: "",
//     subscriptionDuration: "",
//     subscriptionStartDate: new Date().toISOString().split("T")[0],
//     subscriptionEndDate: "",
//     price: "",
//     discount: "",
//     paidAmount: "",
//     profilePic: null,
//     paymentMethod: "",
//     upiNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//   });

//   const [errors, setErrors] = useState({});
//   const params = useParams();
//   const churchId = params.churchId;
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [upiNumber, setUpiNumber] = useState(null);
//   const [expirationDate, setExpirationDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [addressData, setAddressData] = useState(null);
//   const [paymentStatus, setpaymentStatus] = useState("success");

//   const validateForm = () => {
//     let isValid = true;
//     setShowPaymentModal(true);
//     const newErrors = {};

//     if (!/^[a-zA-Z\s]+$/.test(user.fullName)) {
//       newErrors.fullName = "Please enter a valid full name";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.familyName)) {
//       newErrors.familyName = "Please enter a valid family name";
//       isValid = false;
//     }

//     if (!user.dateOfBirth) {
//       newErrors.dateOfBirth = "Please select a date of birth";
//       isValid = false;
//     }

//     if (!user.gender) {
//       newErrors.gender = "Please select a gender";
//       isValid = false;
//     }

//     if (!user.profession) {
//       newErrors.profession = "Please select a profession";
//       isValid = false;
//     }

//     if (
//       !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(user.email)
//     ) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     if (!/^[6-9]\d{9}$/.test(user.phoneNumber)) {
//       newErrors.phoneNumber =
//         "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//       isValid = false;
//     }

//     if (user.disability !== "Yes" && user.disability !== "No") {
//       newErrors.disability = "Please select Yes or No for disability";
//       isValid = false;
//     }

//     if (!user.subscription) {
//       newErrors.subscription = "Please select a subscription type";
//       isValid = false;
//     }

//     if (!user.profilePic) {
//       newErrors.profilePic = "Please upload a image";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.landmark)) {
//       newErrors.landmark = "Please enter a valid land mark";
//       isValid = false;
//     }

//     if (!user.maritalStatus) {
//       newErrors.maritalStatus = "Please select a marital status";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleOpenPaymentModal = () => {
//     setShowPaymentModal(true);
//   };

//   const handleClosePaymentModal = () => {
//     setShowPaymentModal(false);
//   };

//   const generateTransactionId = () => {
//     return Math.random().toString(36).substring(7);
//   };

//   var [alldata, setAlldata] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     setAlldata = user[0];
//     if (validateForm()) {
//       try {
//         console.log(user.paymentMethod);
//         const formData = new FormData();
//         formData.append("file", user.profilePic);
//         formData.append("fullName", user.fullName);
//         formData.append("familyName", user.familyName);
//         formData.append("dateOfBirth", user.dateOfBirth);
//         formData.append("gender", user.gender);
//         formData.append("age", user.age);
//         formData.append("profession", user.profession);
//         formData.append("email", user.email);
//         formData.append("phoneNumber", user.phoneNumber);
//         formData.append("disability", user.disability);
//         formData.append("nationality", user.nationality);
//         formData.append("landmark", user.landmark);
//         formData.append("maritalStatus", user.maritalStatus);
//         formData.append("husbandWifeName", user.husbandWifeName);
//         formData.append("fatherName", user.fatherName);
//         formData.append("motherName", user.motherName);
//         formData.append("subscription", user.subscription);
//         formData.append("subscriptionDuration", user.subscriptionDuration);
//         formData.append("subscriptionStartDate", user.subscriptionStartDate);
//         formData.append("subscriptionEndDate", user.subscriptionEndDate);
//         formData.append("price", user.price);
//         formData.append("discount", user.discount);
//         formData.append("paidAmount", user.paidAmount);
//         formData.append("churchId", churchId);
//         formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//         formData.append("cardNumber", user.cardNumber); // Added cardNumber
//         formData.append("upiNumber", user.upiNumber); // Added upiNumber
//         formData.append("expirationDate", user.expirationDate); // Added expirationDate
//         formData.append("cvv", user.cvv);

//         const response = await axios.post(
//           "http://localhost:9001/savePerson",
//           formData
//         );
//         console.log("Response:", response.data);
//         console.log("Church ID:", churchId);
//         const userid = localStorage.setItem("userid", response.data.id);
//       } catch (error) {
//         console.error("Error:", error);
//         setError(
//           "An error occurred while processing your request. Please try again later."
//         );
//       }
//     }
//   };

//   const submitCard = async (e) => {
//     console.log(alldata);
//     try {
//       // const formData = new FormData();
//       // formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//       // console.log(formData);
//       const userid = localStorage.getItem("userid");
//       const data = {
//         paymentMethod,
//         paymentStatus,
//       };
//       const response = await axios.put(
//         `http://localhost:9001/updateUser/2`,
//         data
//       );
//       console.log(response);
//       alert("payment success");
//     } catch (error) {
//       alert("some error occured");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubscriptionChange = (e) => {
//     setUser({ ...user, subscription: e.target.value });
//   };

//   const handleSubscriptionDurationChange = (e) => {
//     const duration = parseInt(e.target.value);
//     const pricePerYear = 3650; // Assuming the price per year is 3650 units
//     const discountPercentage = 0.9; // Assuming the discount is 90%
//     const price = duration * pricePerYear;
//     const discount = price * discountPercentage;
//     const paidAmount = price - discount;

//     setUser((prevUser) => ({
//       ...prevUser,
//       subscriptionDuration: duration,
//       subscriptionEndDate: calculateSubscriptionEndDate(
//         user.subscriptionStartDate,
//         duration
//       ),
//       price,
//       discount,
//       paidAmount,
//     }));
//   };

//   const calculateSubscriptionEndDate = (startDate, duration) => {
//     if (startDate && duration) {
//       const start = new Date(startDate);
//       const end = new Date(start.getTime());
//       end.setFullYear(end.getFullYear() + duration);
//       return end.toISOString().split("T")[0];
//     }
//     return "";
//   };

//   const handleSubscriptionStartDateChange = (e) => {
//     const startDate = e.target.value;
//     setUser({ ...user, subscriptionStartDate: startDate });
//     calculateSubscriptionEndDate(startDate, user.subscriptionDuration); // Pass startDate directly
//   };

//   const calculateAge = (dob) => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleDateOfBirthChange = (e) => {
//     const dob = e.target.value;
//     setUser({ ...user, dateOfBirth: dob, age: calculateAge(dob) });
//   };

//   const handleMaritalStatusChange = (e) => {
//     const status = e.target.value;
//     setUser({
//       ...user,
//       maritalStatus: status,
//       husbandWifeName: status === "Married" ? user.husbandWifeName : "",
//       fatherName: status === "Unmarried" ? user.fatherName : "",
//       motherName: status === "Unmarried" ? user.motherName : "",
//     });
//   };

//   const getClassName = (fieldName) => {
//     return errors[fieldName] ? "input-error" : "input-valid";
//   };

//   return (
//     <section className="register-container">
//       <form onSubmit={handleSubmit}>
//         <div className="totalconatainment">
//           <div className="background-blur"></div>
//           <div className="form-container glass-card">
//             <div
//               className="form-content"
//               style={{
//                 marginTop: "1cm",
//                 width: "25cm",
//                 margin: "0 auto",
//                 padding: "1cm",
//                 overflow: "hidden",
//               }}
//             >
//               <h1
//                 className="header1"
//                 style={{
//                   marginLeft: "7.5cm",
//                   zIndex: 1,
//                   fontSize: "xxx-large",
//                   color: "black",
//                 }}
//               >
//                 Registration Form
//               </h1>
//               <div style={{ display: "flex", zIndex: 1 }}>
//                 <div
//                   style={{ width: "100%", marginLeft: "2cm", marginTop: "1cm" }}
//                 >
//                   <label>
//                     <b>Full Name:</b>
//                     <input
//                       type="text"
//                       name="fullName"
//                       placeholder="Type your full name here..."
//                       value={user.fullName}
//                       onChange={handleChange}
//                       className={getClassName("fullName")}
//                       style={{
//                         height: "6vh",
//                         borderRadius: "0.4rem",
//                         width: "8cm",
//                         textAlign: "center",
//                       }}
//                     />
//                   </label>
//                   {errors.fullName && (
//                     <span className="error">{errors.fullName}</span>
//                   )}
//                 </div>
//                 <div style={{ marginLeft: "23cm", marginTop: "1cm" }}>
//                   <label style={{ width: "120%", marginLeft: "-18cm" }}>
//                     <b>Family Name:</b>
//                   </label>
//                   <br />
//                   <input
//                     type="text"
//                     name="familyName"
//                     placeholder="Type your family name here..."
//                     value={user.familyName}
//                     onChange={handleChange}
//                     className={getClassName("familyName")}
//                     style={{
//                       height: "6vh",
//                       borderRadius: "0.4rem",
//                       marginLeft: "-18cm",
//                       width: "8cm",
//                       textAlign: "center",
//                     }}
//                   />

//                   {errors.familyName && (
//                     <span className="error">{errors.familyName}</span>
//                   )}
//                 </div>
//               </div>

//               <div style={{ display: "flex" }}>
//                 <div
//                   style={{ width: "50%", marginTop: "1cm", marginLeft: "2cm" }}
//                 >
//                   <label>
//                     <b> Date of Birth:</b>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       value={user.dateOfBirth}
//                       onChange={handleDateOfBirthChange}
//                       className={getClassName("dateOfBirth")}
//                       style={{
//                         height: "6vh",
//                         width: "8cm",
//                         borderRadius: "0.4rem",
//                         marginTop: "-0.2%",
//                         textAlign: "center",
//                         fontSize: "large",
//                       }}
//                     />
//                   </label>
//                   {errors.dateOfBirth && (
//                     <span className="error">{errors.dateOfBirth}</span>
//                   )}
//                 </div>
//                 <div
//                   style={{
//                     width: "200%",
//                     marginLeft: "5.15cm",
//                     marginTop: "1.1cm",
//                   }}
//                 >
//                   <label>
//                     {" "}
//                     <b> Gender:</b>
//                   </label>
//                   <div>
//                     <label>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="male"
//                         checked={user.gender === "male"}
//                         onChange={handleChange}
//                       />
//                       Male
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="female"
//                         checked={user.gender === "female"}
//                         onChange={handleChange}
//                       />
//                       Female
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="others"
//                         checked={user.gender === "others"}
//                         onChange={handleChange}
//                       />
//                       Others
//                     </label>
//                   </div>
//                   {errors.gender && (
//                     <span className="error">{errors.gender}</span>
//                   )}
//                 </div>
//               </div>

//               <div style={{ display: "flex" }}>
//                 <div style={{ marginTop: "1cm", marginLeft: "2cm" }}>
//                   <label>
//                     <b> Age: </b>
//                     <input
//                       type="number"
//                       name="age"
//                       value={user.age}
//                       onChange={handleChange}
//                       disabled
//                       style={{
//                         width: "8cm",
//                         height: "6vh",
//                         borderRadius: "0.4rem",
//                         textAlign: "center",
//                         fontSize: "large",
//                       }}
//                     />
//                   </label>
//                 </div>
//                 <div style={{ marginTop: "1.1cm", marginLeft: "5cm" }}>
//                   <label>
//                     <b>Profession:</b>
//                   </label>
//                   <select
//                     name="profession"
//                     value={user.profession}
//                     onChange={handleChange}
//                     className={getClassName("profession")}
//                     style={{
//                       width: "8.1cm",
//                       height: "6vh",
//                       borderRadius: "0.4rem",
//                       textAlign: "center",
//                       fontSize: "large",
//                       marginLeft: "-0.5cm",
//                     }}
//                   >
//                     <option value="none">--select--</option>
//                     <option value="job">Job</option>
//                     <option value="job">Student</option>
//                     <option value="business">Business</option>
//                     <option value="other">other</option>
//                   </select>

//                   {errors.profession && (
//                     <span className="error">{errors.profession}</span>
//                   )}
//                 </div>
//               </div>

//               <div style={{ display: "flex" }}>
//                 <div style={{ marginLeft: "2cm", marginTop: "1cm" }}>
//                   <label>
//                     <b> Email:</b>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Type your full Emailid..."
//                       value={user.email}
//                       onChange={handleChange}
//                       className={getClassName("email")}
//                       style={{
//                         width: "8cm",
//                         borderRadius: "0.4rem",
//                         height: "6vh",
//                         textAlign: "center",
//                       }}
//                     />
//                   </label>
//                   {errors.email && (
//                     <span className="error">{errors.email}</span>
//                   )}
//                 </div>
//                 <div style={{ marginLeft: "4cm", marginTop: "1cm" }}>
//                   <label style={{ marginLeft: "12%" }}>
//                     <b>Phone Number:</b>
//                     <input
//                       type="tel"
//                       name="phoneNumber"
//                       placeholder="+910123456789"
//                       value={user.phoneNumber}
//                       onChange={handleChange}
//                       className={getClassName("phoneNumber")}
//                       style={{
//                         width: "8cm",
//                         height: "6vh",
//                         borderRadius: "0.4rem",
//                         textAlign: "center",
//                         fontSize: "large",
//                         marginLeft: "1.1cm",
//                       }}
//                     />
//                   </label>
//                   {errors.phoneNumber && (
//                     <span className="error">{errors.phoneNumber}</span>
//                   )}
//                 </div>
//               </div>
//               <div style={{ marginTop: "1.1cm", marginLeft: "2cm" }}>
//                 <label>
//                   <b>Disability:</b>
//                 </label>
//                 <br />
//                 <input
//                   style={{
//                     width: "8cm",
//                     borderRadius: "0.4rem",
//                     height: "6vh",
//                     textAlign: "center",
//                   }}
//                   type="text"
//                   name="disability"
//                   value={user.disability}
//                   onChange={handleChange}
//                   className={getClassName("disability")}
//                 />

//                 {errors.disability && (
//                   <span className="error">{errors.disability}</span>
//                 )}
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
//                 <label>
//                   <b>Nationality:</b>
//                 </label>
//                 <input
//                   style={{
//                     width: "8cm",
//                     height: "6vh",
//                     borderRadius: "0.4rem",
//                     textAlign: "center",
//                     fontSize: "large",
//                     marginLeft: "0cm",
//                   }}
//                   type="text"
//                   name="nationality"
//                   value={user.nationality}
//                   onChange={handleChange}
//                   className={getClassName("nationality")}
//                 />

//                 {errors.nationality && (
//                   <span className="error">{errors.nationality}</span>
//                 )}
//               </div>
//               <div style={{ marginTop: "1.1cm", marginLeft: "2cm" }}>
//                 <label>
//                   <b> Landmark: </b>
//                 </label>
//                 <br />
//                 <input
//                   style={{
//                     width: "8cm",
//                     borderRadius: "0.4rem",
//                     height: "6vh",
//                     textAlign: "center",
//                   }}
//                   type="text"
//                   name="landmark"
//                   placeholder="Your Area.."
//                   value={user.landmark}
//                   onChange={handleChange}
//                   className={getClassName("familyName")}
//                 />

//                 {errors.landmark && (
//                   <span className="error">{errors.landmark}</span>
//                 )}
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
//                 <label>
//                   <b>Marital Status:</b>
//                   <select
//                     style={{
//                       width: "8.1cm",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                       textAlign: "center",
//                       fontSize: "large",
//                     }}
//                     value={user.maritalStatus}
//                     onChange={handleMaritalStatusChange}
//                     className={getClassName("maritalStatus")}
//                     name="maritalStatus"
//                   >
//                     <option value="none">--select--</option>
//                     <option value="Married">Married</option>
//                     <option value="Unmarried">Unmarried</option>
//                   </select>
//                   {errors.maritalStatus && (
//                     <span className="error">{errors.maritalStatus}</span>
//                   )}
//                 </label>

//                 {user.maritalStatus === "Married" && (
//                   <label>
//                     <b>Husband/Wife Name:</b>
//                     <input
//                       type="text"
//                       name="husbandWifeName"
//                       value={user.husbandWifeName}
//                       onChange={handleChange}
//                       className={getClassName("husbandWifeName")}
//                     />
//                   </label>
//                 )}
//                 {user.maritalStatus === "Unmarried" && (
//                   <div>
//                     <label>
//                       <b>Father's Name:</b>
//                       <input
//                         type="text"
//                         name="fatherName"
//                         value={user.fatherName}
//                         onChange={handleChange}
//                         className={getClassName("fatherName")}
//                       />
//                     </label>
//                     <label>
//                       <b>Mother's Name:</b>
//                       <input
//                         type="text"
//                         name="motherName"
//                         value={user.motherName}
//                         onChange={handleChange}
//                         className={getClassName("motherName")}
//                       />
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
//                 <label>
//                   <b>Subscription Type:</b>
//                 </label>
//                 <br />
//                 <select
//                   style={{
//                     width: "8.1cm",
//                     borderRadius: "0.4rem",
//                     height: "6vh",
//                     textAlign: "center",
//                     fontSize: "large",
//                   }}
//                   value={user.subscription}
//                   className={getClassName("subscription")}
//                   onChange={handleSubscriptionChange}
//                 >
//                   <option value="Select an option">--select--</option>
//                   <option value="Free">Free</option>
//                   <option value="Premium">Premium</option>
//                 </select>

//                 {errors.subscription && (
//                   <span className="error">{errors.subscription}</span>
//                 )}
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.75cm" }}>
//                 <label>
//                   <b>Subscription Duration:</b>
//                   <select
//                     style={{
//                       width: "8.1cm",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                       textAlign: "center",
//                       fontSize: "large",
//                     }}
//                     value={user.subscriptionDuration}
//                     onChange={handleSubscriptionDurationChange}
//                     className={getClassName("subscriptionDuration")}
//                   >
//                     <option value={0}> Select an Option</option>
//                     <option value={1}>1 year</option>
//                     <option value={2}>2 years</option>
//                     <option value={5}>5 years</option>
//                   </select>
//                 </label>
//               </div>

//               <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
//                 <label>
//                   <b> Subscription Start Date:</b>
//                 </label>
//                 <br />
//                 <input
//                   style={{
//                     height: "6vh",
//                     width: "8cm",
//                     borderRadius: "0.4rem",
//                     marginTop: "-0.2%",
//                     textAlign: "center",
//                     fontSize: "large",
//                   }}
//                   type="date"
//                   name="subscriptionStartDate"
//                   value={user.subscriptionStartDate}
//                   onChange={handleSubscriptionStartDateChange}
//                 />
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
//                 <label>
//                   <b> Subscription End Date:</b>
//                   <input
//                     style={{
//                       width: "8cm",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                       textAlign: "center",
//                       fontSize: "large",
//                     }}
//                     type="date"
//                     name="subscriptionEndDate"
//                     value={user.subscriptionEndDate}
//                     readOnly
//                   />
//                 </label>
//               </div>

//               <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
//                 <label>
//                   <b>Subscription Price:</b>
//                 </label>
//                 <br />
//                 <input
//                   style={{
//                     width: "8cm",
//                     borderRadius: "0.4rem",
//                     height: "6vh",
//                     textAlign: "center",
//                     fontSize: "large",
//                   }}
//                   type="number"
//                   name="price"
//                   value={user.price}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
//                 <label>
//                   <b>Discount:</b>
//                   <input
//                     style={{
//                       width: "8cm",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                       textAlign: "center",
//                       fontSize: "large",
//                     }}
//                     type="number"
//                     name="discount"
//                     value={user.discount}
//                     onChange={handleChange}
//                   />
//                 </label>
//               </div>
//               <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
//                 <label>
//                   <b>Final Price:</b>
//                 </label>
//                 <br />
//                 <input
//                   style={{
//                     width: "8cm",
//                     borderRadius: "0.4rem",
//                     height: "6vh",
//                     textAlign: "center",
//                     fontSize: "large",
//                   }}
//                   type="number"
//                   name="paidAmount"
//                   value={user.paidAmount}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
//                 <label>
//                   <b>Profile Picture:</b>
//                 </label>
//                 <br />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   name="profilePic"
//                   onChange={(e) =>
//                     setUser({ ...user, profilePic: e.target.files[0] })
//                   }
//                   className={getClassName("profilePic")}
//                 />

//                 {errors.profilePic && (
//                   <span className="error">{errors.profilePic}</span>
//                 )}
//               </div>
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <button
//                 type="submit"
//                 className="btn btn-light"
//                 style={{ marginLeft: "11cm", width: "3cm", height: "1cm" }}
//               >
//                 Register
//               </button>
//             </div>
//             <br />
//           </div>
//         </div>

//         <Modal
//           open={showPaymentModal}
//           onClose={() => setShowPaymentModal(false)}
//         >
//           <div className="container" style={{ marginTop: "-5%" }}>
//             <div className="row">
//               <div className="col-6">
//                 <Container
//                   className="payment-container w-100"
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     borderRadius: "15px",
//                     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                     width: "40%",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ display: "flex", marginLeft: "-40%" }}>
//                     <div>
//                       <h2
//                         className="payment-heading-center"
//                         style={{
//                           color: "black",
//                           marginLeft: "-15%",
//                           marginRight: "-200%",
//                         }}
//                       >
//                         Payment Details
//                       </h2>
//                     </div>
//                     <div style={{ marginLeft: "70%", marginRight: "-150%" }}>
//                       {success && (
//                         <Button
//                           className="mt-4"
//                           variant="primary"
//                           style={{ marginLeft: "37%", borderRadius: "2rem" }}
//                         >
//                           Print Receipt
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                   <br />
//                   <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="paymentMethod">
//                       <Form.Label
//                         style={{ marginLeft: "1%", fontSize: "1.2rem" }}
//                       >
//                         Select Payment Method
//                       </Form.Label>{" "}
//                       <br />
//                       <Form.Control
//                         as="select"
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         name="paymentMethod"
//                         required
//                         style={{ marginLeft: "5%" }}
//                       >
//                         <option value="" disabled>
//                           {" "}
//                           <br />
//                           Select Payment Method
//                         </option>
//                         <option value="credit_card">Credit Card</option>
//                         <option value="debit_card">Debit Card</option>
//                         <option value="upi">UPI</option>
//                         <option value="razorpay">Razorpay</option>
//                         <option value="cash_on_delivery">
//                           Cash On Delivery
//                         </option>
//                       </Form.Control>
//                     </Form.Group>{" "}
//                     <br />
//                     {user.paymentMethod === "upi" && (
//                       <Form.Group controlId="upiNumber">
//                         <Form.Label
//                           style={{ marginLeft: "7%", fontSize: "1.2rem" }}
//                         >
//                           UPI Number
//                         </Form.Label>{" "}
//                         <br />
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter UPI Number"
//                           //   value={upiNumber}
//                           //   onChange={(e) => setUpiNumber(e.target.value)}
//                           name="upiNumber"
//                           value={user.upiNumber}
//                           onChange={handleChange}
//                           required
//                           style={{ marginLeft: "5%" }}
//                         />
//                       </Form.Group>
//                     )}
//                     {user.paymentMethod !== "upi" &&
//                       user.paymentMethod !== "cash_on_delivery" && (
//                         <>
//                           <Form.Group controlId="cardNumber">
//                             <Form.Label
//                               style={{ marginLeft: "6%", fontSize: "1.2rem" }}
//                             >
//                               Card Number
//                             </Form.Label>{" "}
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter card number"
//                               value={user.cardNumber}
//                               onChange={handleChange}
//                               name="cardNumber"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>{" "}
//                           <br />
//                           <Form.Group controlId="expirationDate">
//                             <Form.Label
//                               style={{ marginLeft: "3%", fontSize: "1.2rem" }}
//                             >
//                               Expiration Date
//                             </Form.Label>
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="MM/YY"
//                               value={user.expirationDate}
//                               onChange={handleChange}
//                               name="expirationDate"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>{" "}
//                           <br />
//                           <Form.Group controlId="cvv">
//                             <Form.Label
//                               style={{ marginLeft: "2%", fontSize: "1.2rem" }}
//                             >
//                               CVV
//                             </Form.Label>{" "}
//                             <br />
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter CVV"
//                               value={user.cvv}
//                               onChange={handleChange}
//                               name="cvv"
//                               required
//                               style={{ marginLeft: "5%" }}
//                             />
//                           </Form.Group>
//                         </>
//                       )}
//                     {user.paymentMethod === "cash_on_delivery" && (
//                       <div style={{ marginLeft: "5%" }}>
//                         <Alert variant="warning">
//                           Cash On Delivery selected
//                         </Alert>
//                       </div>
//                     )}
//                     <br />
//                     <div className="payment-heading-center">
//                       <Button
//                         onClick={submitCard}
//                         className="mt-4"
//                         variant="primary"
//                         type="submit"
//                         disabled={loading}
//                         style={{ marginLeft: "5%" }}
//                       >
//                         {loading ? "Processing..." : "Submit Payment"}
//                       </Button>
//                     </div>{" "}
//                     <br />
//                     {error && (
//                       <Alert
//                         variant="danger"
//                         style={{ color: "red", marginLeft: "32%" }}
//                       >
//                         {error}
//                       </Alert>
//                     )}{" "}
//                     {/* Display error alert */}
//                     {success && (
//                       <Alert
//                         variant="success"
//                         style={{ color: "green", marginLeft: "5%" }}
//                       >
//                         Payment successful!
//                       </Alert>
//                     )}
//                   </Form>
//                 </Container>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </form>
//     </section>
//   );
// }

// export default UserRegister;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "@mui/material";
import "./UserRegister.css";
import { Container, Form, Button, Alert } from "react-bootstrap";

function UserRegister() {
  const [user, setUser] = useState({
    fullName: "",
    familyName: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    profession: "",
    email: "",
    phoneNumber: "",
    disability: "",
    nationality: "",
    landmark: "",
    maritalStatus: "",
    husbandWifeName: "",
    fatherName: "",
    motherName: "",
    subscription: "",
    subscriptionDuration: "",
    subscriptionStartDate: new Date().toISOString().split("T")[0],
    subscriptionEndDate: "",
    price: "",
    discount: "",
    paidAmount: "",
    profilePic: null,
    paymentMethod: "",
    upiNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const params = useParams();
  const churchId = params.churchId;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiNumber, setUpiNumber] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [products, setProducts] = useState([]);
  const [addressData, setAddressData] = useState(null);
  const [paymentStatus, setpaymentStatus] = useState("success");

  const validateForm = () => {
    let isValid = true;
    setShowPaymentModal(true);
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(user.fullName)) {
      newErrors.fullName = "Please enter a valid full name";
      isValid = false;
    }

    if (!/^[a-zA-Z\s]+$/.test(user.familyName)) {
      newErrors.familyName = "Please enter a valid family name";
      isValid = false;
    }

    if (!user.dateOfBirth) {
      newErrors.dateOfBirth = "Please select a date of birth";
      isValid = false;
    }

    if (!user.gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    }

    if (!user.profession) {
      newErrors.profession = "Please select a profession";
      isValid = false;
    }

    if (
      !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(user.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!/^[6-9]\d{9}$/.test(user.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
      isValid = false;
    }

    if (user.disability !== "Yes" && user.disability !== "No") {
      newErrors.disability = "Please select Yes or No for disability";
      isValid = false;
    }

    if (!user.subscription) {
      newErrors.subscription = "Please select a subscription type";
      isValid = false;
    }

    if (!user.profilePic) {
      newErrors.profilePic = "Please upload a image";
      isValid = false;
    }

    if (!/^[a-zA-Z\s]+$/.test(user.landmark)) {
      newErrors.landmark = "Please enter a valid land mark";
      isValid = false;
    }

    if (!user.maritalStatus) {
      newErrors.maritalStatus = "Please select a marital status";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const generateTransactionId = () => {
    return Math.random().toString(36).substring(7);
  };

  var [alldata, setAlldata] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    setAlldata = user[0];
    if (validateForm()) {
      try {
        console.log(user.paymentMethod);
        const formData = new FormData();
        formData.append("file", user.profilePic);
        formData.append("fullName", user.fullName);
        formData.append("familyName", user.familyName);
        formData.append("dateOfBirth", user.dateOfBirth);
        formData.append("gender", user.gender);
        formData.append("age", user.age);
        formData.append("profession", user.profession);
        formData.append("email", user.email);
        formData.append("phoneNumber", user.phoneNumber);
        formData.append("disability", user.disability);
        formData.append("nationality", user.nationality);
        formData.append("landmark", user.landmark);
        formData.append("maritalStatus", user.maritalStatus);
        formData.append("husbandWifeName", user.husbandWifeName);
        formData.append("fatherName", user.fatherName);
        formData.append("motherName", user.motherName);
        formData.append("subscription", user.subscription);
        formData.append("subscriptionDuration", user.subscriptionDuration);
        formData.append("subscriptionStartDate", user.subscriptionStartDate);
        formData.append("subscriptionEndDate", user.subscriptionEndDate);
        formData.append("price", user.price);
        formData.append("discount", user.discount);
        formData.append("paidAmount", user.paidAmount);
        formData.append("churchId", churchId);
        formData.append("paymentMethod", user.paymentMethod);
        formData.append("cardNumber", user.cardNumber);
        formData.append("upiNumber", user.upiNumber);
        formData.append("expirationDate", user.expirationDate);
        formData.append("cvv", user.cvv);

        const response = await axios.post(
          "http://localhost:9001/savePerson",
          formData
        );
        console.log("Response:", response.data);
        console.log("Church ID:", churchId);
        const userid = localStorage.setItem("userid", response.data.id);
      } catch (error) {
        console.error("Error:", error);
        setError(
          "An error occurred while processing your request. Please try again later."
        );
      }
    }
  };

  const submitCard = async (e) => {
    console.log(alldata);
    try {
      // const formData = new FormData();
      // formData.append("paymentMethod", user.paymentMethod);
      // console.log(formData);
      const userid = localStorage.getItem("userid");
      const data = {
        paymentMethod,
        paymentStatus,
      };
      const response = await axios.put(
        `http://localhost:9001/updateUser/${userid}`,
        data
      );
      console.log(response);
      alert("payment success");
    } catch (error) {
      alert("some error occured");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubscriptionChange = (e) => {
    setUser({ ...user, subscription: e.target.value });
  };

  const handleSubscriptionDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    const pricePerYear = 3650;
    const discountPercentage = 0.9;
    const price = duration * pricePerYear;
    const discount = price * discountPercentage;
    const paidAmount = price - discount;

    setUser((prevUser) => ({
      ...prevUser,
      subscriptionDuration: duration,
      subscriptionEndDate: calculateSubscriptionEndDate(
        user.subscriptionStartDate,
        duration
      ),
      price,
      discount,
      paidAmount,
    }));
  };

  const calculateSubscriptionEndDate = (startDate, duration) => {
    if (startDate && duration) {
      const start = new Date(startDate);
      const end = new Date(start.getTime());
      end.setFullYear(end.getFullYear() + duration);
      return end.toISOString().split("T")[0];
    }
    return "";
  };

  const handleSubscriptionStartDateChange = (e) => {
    const startDate = e.target.value;
    setUser({ ...user, subscriptionStartDate: startDate });
    calculateSubscriptionEndDate(startDate, user.subscriptionDuration);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    setUser({ ...user, dateOfBirth: dob, age: calculateAge(dob) });
  };

  const handleMaritalStatusChange = (e) => {
    const status = e.target.value;
    setUser({
      ...user,
      maritalStatus: status,
      husbandWifeName: status === "Married" ? user.husbandWifeName : "",
      fatherName: status === "Unmarried" ? user.fatherName : "",
      motherName: status === "Unmarried" ? user.motherName : "",
    });
  };

  const getClassName = (fieldName) => {
    return errors[fieldName] ? "input-error" : "input-valid";
  };

  return (
    <section className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="totalconatainment">
          <div className="RegForm"></div>
          <div className="Reg-form-container Reg-glass-card">
            <div
              className="RegForm-form-content"
              style={{
                marginTop: "1cm",
                width: "25cm",
                margin: "0 auto",
                padding: "1cm",
                overflow: "hidden",
              }}
            >
              <h1
                className="header1"
                style={{
                  marginLeft: "7.5cm",
                  zIndex: 1,
                  fontSize: "xxx-large",
                  color: "black",
                }}
              >
                Registration Form
              </h1>
              <div style={{ display: "flex", zIndex: 1 }}>
                <div
                  style={{ width: "100%", marginLeft: "2cm", marginTop: "1cm" }}
                >
                  <label>
                    <b>Full Name:</b>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Type your full name here..."
                      value={user.fullName}
                      onChange={handleChange}
                      className={getClassName("fullName")}
                      style={{
                        height: "6vh",
                        borderRadius: "0.4rem",
                        width: "8cm",
                        textAlign: "center",
                      }}
                    />
                  </label>
                  {errors.fullName && (
                    <span className="error">{errors.fullName}</span>
                  )}
                </div>
                <div style={{ marginLeft: "23cm", marginTop: "1cm" }}>
                  <label style={{ width: "120%", marginLeft: "-18cm" }}>
                    <b>Family Name:</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="familyName"
                    placeholder="Type your family name here..."
                    value={user.familyName}
                    onChange={handleChange}
                    className={getClassName("familyName")}
                    style={{
                      height: "6vh",
                      borderRadius: "0.4rem",
                      marginLeft: "-18cm",
                      width: "8cm",
                      textAlign: "center",
                    }}
                  />

                  {errors.familyName && (
                    <span className="error">{errors.familyName}</span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{ width: "50%", marginTop: "1cm", marginLeft: "2cm" }}
                >
                  <label>
                    <b> Date of Birth:</b>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={handleDateOfBirthChange}
                      className={getClassName("dateOfBirth")}
                      style={{
                        height: "6vh",
                        width: "8cm",
                        borderRadius: "0.4rem",
                        marginTop: "-0.2%",
                        textAlign: "center",
                        fontSize: "large",
                      }}
                    />
                  </label>
                  {errors.dateOfBirth && (
                    <span className="error">{errors.dateOfBirth}</span>
                  )}
                </div>
                <div
                  style={{
                    width: "200%",
                    marginLeft: "5.15cm",
                    marginTop: "1.1cm",
                  }}
                >
                  <label>
                    {" "}
                    <b> Gender:</b>
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={user.gender === "male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={user.gender === "female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="others"
                        checked={user.gender === "others"}
                        onChange={handleChange}
                      />
                      Others
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="error">{errors.gender}</span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "1cm", marginLeft: "2cm" }}>
                  <label>
                    <b> Age: </b>
                    <input
                      type="number"
                      name="age"
                      value={user.age}
                      onChange={handleChange}
                      disabled
                      style={{
                        width: "8cm",
                        height: "6vh",
                        borderRadius: "0.4rem",
                        textAlign: "center",
                        fontSize: "large",
                      }}
                    />
                  </label>
                </div>
                <div style={{ marginTop: "1.1cm", marginLeft: "5cm" }}>
                  <label>
                    <b>Profession:</b>
                  </label>
                  <select
                    name="profession"
                    value={user.profession}
                    onChange={handleChange}
                    className={getClassName("profession")}
                    style={{
                      width: "8.1cm",
                      height: "6vh",
                      borderRadius: "0.4rem",
                      textAlign: "center",
                      fontSize: "large",
                      marginLeft: "-0.5cm",
                    }}
                  >
                    <option value="none">--select--</option>
                    <option value="job">Job</option>
                    <option value="Student">Student</option>
                    <option value="business">Business</option>
                    <option value="other">other</option>
                  </select>

                  {errors.profession && (
                    <span className="error">{errors.profession}</span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "2cm", marginTop: "1cm" }}>
                  <label>
                    <b> Email:</b>
                    <input
                      type="email"
                      name="email"
                      placeholder="Type your full Emailid..."
                      value={user.email}
                      onChange={handleChange}
                      className={getClassName("email")}
                      style={{
                        width: "8cm",
                        borderRadius: "0.4rem",
                        height: "6vh",
                        textAlign: "center",
                      }}
                    />
                  </label>
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div style={{ marginLeft: "4cm", marginTop: "1cm" }}>
                  <label style={{ marginLeft: "12%" }}>
                    <b>Phone Number:</b>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+910123456789"
                      value={user.phoneNumber}
                      onChange={handleChange}
                      className={getClassName("phoneNumber")}
                      style={{
                        width: "8cm",
                        height: "6vh",
                        borderRadius: "0.4rem",
                        textAlign: "center",
                        fontSize: "large",
                        marginLeft: "1.1cm",
                      }}
                    />
                  </label>
                  {errors.phoneNumber && (
                    <span className="error">{errors.phoneNumber}</span>
                  )}
                </div>
              </div>
              <div style={{ marginTop: "1.1cm", marginLeft: "2cm" }}>
                <label>
                  <b>Disability:</b>
                </label>
                <br />
                <input
                  style={{
                    width: "8cm",
                    borderRadius: "0.4rem",
                    height: "6vh",
                    textAlign: "center",
                  }}
                  type="text"
                  name="disability"
                  value={user.disability}
                  onChange={handleChange}
                  className={getClassName("disability")}
                />

                {errors.disability && (
                  <span className="error">{errors.disability}</span>
                )}
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
                <label>
                  <b>Nationality:</b>
                </label>
                <input
                  style={{
                    width: "8cm",
                    height: "6vh",
                    borderRadius: "0.4rem",
                    textAlign: "center",
                    fontSize: "large",
                    marginLeft: "0cm",
                  }}
                  type="text"
                  name="nationality"
                  value={user.nationality}
                  onChange={handleChange}
                  className={getClassName("nationality")}
                />

                {errors.nationality && (
                  <span className="error">{errors.nationality}</span>
                )}
              </div>
              <div style={{ marginTop: "1.1cm", marginLeft: "2cm" }}>
                <label>
                  <b> Landmark: </b>
                </label>
                <br />
                <input
                  style={{
                    width: "8cm",
                    borderRadius: "0.4rem",
                    height: "6vh",
                    textAlign: "center",
                  }}
                  type="text"
                  name="landmark"
                  placeholder="Your Area.."
                  value={user.landmark}
                  onChange={handleChange}
                  className={getClassName("familyName")}
                />

                {errors.landmark && (
                  <span className="error">{errors.landmark}</span>
                )}
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
                <label>
                  <b>Marital Status:</b>
                  <select
                    style={{
                      width: "8.1cm",
                      borderRadius: "0.4rem",
                      height: "6vh",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                    value={user.maritalStatus}
                    onChange={handleMaritalStatusChange}
                    className={getClassName("maritalStatus")}
                    name="maritalStatus"
                  >
                    <option value="none">--select--</option>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                  </select>
                  {errors.maritalStatus && (
                    <span className="error">{errors.maritalStatus}</span>
                  )}
                </label>

                {user.maritalStatus === "Married" && (
                  <label>
                    <b>Husband/Wife Name:</b>
                    <input
                      type="text"
                      name="husbandWifeName"
                      value={user.husbandWifeName}
                      onChange={handleChange}
                      className={getClassName("husbandWifeName")}
                      style={{
                        width: "8cm",
                        borderRadius: "0.4rem",
                        height: "6vh",
                        textAlign: "center",
                      }}
                    />
                  </label>
                )}
                {user.maritalStatus === "Unmarried" && (
                  <div>
                    <label>
                      <b>Father's Name:</b>
                      <input
                        type="text"
                        name="fatherName"
                        value={user.fatherName}
                        onChange={handleChange}
                        className={getClassName("fatherName")}
                        style={{
                          width: "8cm",
                          borderRadius: "0.4rem",
                          height: "6vh",
                          textAlign: "center",
                        }}
                      />
                    </label>
                    <label>
                      <b>Mother's Name:</b>
                      <input
                        type="text"
                        name="motherName"
                        value={user.motherName}
                        onChange={handleChange}
                        className={getClassName("motherName")}
                        style={{
                          width: "8cm",
                          borderRadius: "0.4rem",
                          height: "6vh",
                          textAlign: "center",
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
                <label>
                  <b>Subscription Type:</b>
                </label>
                <br />
                <select
                  style={{
                    width: "8.1cm",
                    borderRadius: "0.4rem",
                    height: "6vh",
                    textAlign: "center",
                    fontSize: "large",
                  }}
                  value={user.subscription}
                  className={getClassName("subscription")}
                  onChange={handleSubscriptionChange}
                >
                  <option value="Select an option">--select--</option>

                  <option value="Premium">Premium</option>
                </select>

                {errors.subscription && (
                  <span className="error">{errors.subscription}</span>
                )}
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.75cm" }}>
                <label>
                  <b>Subscription Duration:</b>
                  <select
                    style={{
                      width: "8.1cm",
                      borderRadius: "0.4rem",
                      height: "6vh",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                    value={user.subscriptionDuration}
                    onChange={handleSubscriptionDurationChange}
                    className={getClassName("subscriptionDuration")}
                  >
                    <option value={0}> Select an Option</option>
                    <option value={1}>1 year</option>
                    <option value={2}>2 years</option>
                    <option value={5}>5 years</option>
                  </select>
                </label>
              </div>

              <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
                <label>
                  <b> Subscription Start Date:</b>
                </label>
                <br />
                <input
                  style={{
                    height: "6vh",
                    width: "8cm",
                    borderRadius: "0.4rem",
                    marginTop: "-0.2%",
                    textAlign: "center",
                    fontSize: "large",
                  }}
                  type="date"
                  name="subscriptionStartDate"
                  value={user.subscriptionStartDate}
                  onChange={handleSubscriptionStartDateChange}
                />
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
                <label>
                  <b> Subscription End Date:</b>
                  <input
                    style={{
                      width: "8cm",
                      borderRadius: "0.4rem",
                      height: "6vh",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                    type="date"
                    name="subscriptionEndDate"
                    value={user.subscriptionEndDate}
                    readOnly
                  />
                </label>
              </div>

              <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
                <label>
                  <b>Subscription Price:</b>
                </label>
                <br />
                <input
                  style={{
                    width: "8cm",
                    borderRadius: "0.4rem",
                    height: "6vh",
                    textAlign: "center",
                    fontSize: "large",
                  }}
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
                <label>
                  <b>Discount:</b>
                  <input
                    style={{
                      width: "8cm",
                      borderRadius: "0.4rem",
                      height: "6vh",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                    type="number"
                    name="discount"
                    value={user.discount}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div style={{ marginLeft: "2cm", marginTop: "1.1cm" }}>
                <label>
                  <b>Final Price:</b>
                </label>
                <br />
                <input
                  style={{
                    width: "8cm",
                    borderRadius: "0.4rem",
                    height: "6vh",
                    textAlign: "center",
                    fontSize: "large",
                  }}
                  type="number"
                  name="paidAmount"
                  value={user.paidAmount}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "15.26cm", marginTop: "-1.85cm" }}>
                <label>
                  <b>Profile Picture:</b>
                </label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  onChange={(e) =>
                    setUser({ ...user, profilePic: e.target.files[0] })
                  }
                  className={getClassName("profilePic")}
                />

                {errors.profilePic && (
                  <span className="error">{errors.profilePic}</span>
                )}
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                style={{ marginLeft: "11cm", width: "3cm", height: "1cm" }}
              >
                Register
              </button>
            </div>
            <br />
          </div>
        </div>
      </form>

      <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
        <div
          className="container"
          style={{ marginTop: "10%", marginLeft: "30%" }}
        >
          <div className="row">
            <div className="col-6">
              <Container
                className="payment-container w-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "15px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  width: "40%",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", marginLeft: "-40%" }}>
                  <div>
                    <h2
                      className="payment-heading-center"
                      style={{
                        color: "black",
                        marginLeft: "85%",
                        marginRight: "-200%",
                      }}
                    >
                      Payment Details
                    </h2>
                  </div>
                  <div style={{ marginLeft: "70%", marginRight: "-150%" }}>
                    {success && (
                      <Button
                        className="mt-4"
                        variant="primary"
                        style={{ marginLeft: "37%", borderRadius: "2rem" }}
                      >
                        Print Receipt
                      </Button>
                    )}
                  </div>
                </div>
                <br />
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="paymentMethod">
                    <Form.Label
                      style={{ marginLeft: "1%", fontSize: "1.2rem" }}
                    >
                      Select Payment Method
                    </Form.Label>{" "}
                    <br />
                    <Form.Control
                      as="select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      name="paymentMethod"
                      required
                      style={{ marginLeft: "5%" }}
                    >
                      <option value="" disabled>
                        {" "}
                        <br />
                        Select Payment Method
                      </option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="upi">UPI</option>
                    </Form.Control>
                  </Form.Group>{" "}
                  <br />
                  {paymentMethod === "upi" && (
                    <Form.Group controlId="upiNumber">
                      <Form.Label
                        style={{ marginLeft: "7%", fontSize: "1.2rem" }}
                      >
                        UPI Number
                      </Form.Label>{" "}
                      <br />
                      <Form.Control
                        type="text"
                        placeholder="Enter UPI Number"
                        value={user.upiNumber}
                        onChange={handleChange}
                        name="upiNumber"
                        required
                        style={{ marginLeft: "5%" }}
                      />
                    </Form.Group>
                  )}
                  {(paymentMethod === "credit_card" ||
                    paymentMethod === "debit_card") && (
                    <>
                      <Form.Group controlId="cardNumber">
                        <Form.Label
                          style={{ marginLeft: "6%", fontSize: "1.2rem" }}
                        >
                          Card Number
                        </Form.Label>{" "}
                        <br />
                        <Form.Control
                          type="text"
                          placeholder="Enter card number"
                          value={user.cardNumber}
                          onChange={handleChange}
                          name="cardNumber"
                          required
                          style={{ marginLeft: "5%" }}
                        />
                      </Form.Group>{" "}
                      <br />
                      <Form.Group controlId="expirationDate">
                        <Form.Label
                          style={{ marginLeft: "3%", fontSize: "1.2rem" }}
                        >
                          Expiration Date
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={user.expirationDate}
                          onChange={handleChange}
                          name="expirationDate"
                          required
                          style={{ marginLeft: "5%" }}
                        />
                      </Form.Group>{" "}
                      <br />
                      <Form.Group controlId="cvv">
                        <Form.Label
                          style={{ marginLeft: "2%", fontSize: "1.2rem" }}
                        >
                          CVV
                        </Form.Label>{" "}
                        <br />
                        <Form.Control
                          type="text"
                          placeholder="Enter CVV"
                          value={user.cvv}
                          onChange={handleChange}
                          name="cvv"
                          required
                          style={{ marginLeft: "5%" }}
                        />
                      </Form.Group>
                    </>
                  )}
                  <br />
                  <div className="payment-heading-center">
                    <Button
                      onClick={submitCard}
                      className="mt-4"
                      variant="primary"
                      type="submit"
                      disabled={loading}
                      style={{ marginLeft: "5%" }}
                    >
                      {loading ? "Processing..." : "Submit Payment"}
                    </Button>
                  </div>{" "}
                  <br />
                  {error && (
                    <Alert
                      variant="danger"
                      style={{ color: "red", marginLeft: "32%" }}
                    >
                      {error}
                    </Alert>
                  )}{" "}
                  {/* Display error alert */}
                  {success && (
                    <Alert
                      variant="success"
                      style={{ color: "green", marginLeft: "5%" }}
                    >
                      Payment successful!
                    </Alert>
                  )}
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default UserRegister;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Modal } from "@mui/material";
// import "./UserRegister.css";
// import { Container, Form, Button, Alert } from "react-bootstrap";

// function UserRegister() {
//   const [user, setUser] = useState({
//     fullName: "",
//     familyName: "",
//     dateOfBirth: "",
//     gender: "",
//     age: "",
//     profession: "",
//     email: "",
//     phoneNumber: "",
//     disability: "",
//     nationality: "",
//     landmark: "",
//     maritalStatus: "",
//     husbandWifeName: "",
//     fatherName: "",
//     motherName: "",
//     subscription: "",
//     subscriptionDuration: "",
//     subscriptionStartDate: new Date().toISOString().split("T")[0],
//     subscriptionEndDate: "",
//     price: "",
//     discount: "",
//     paidAmount: "",
//     profilePic: null,
//     paymentMethod: "",
//     upiNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//   });

//   const [errors, setErrors] = useState({});
//   const params = useParams();
//   const churchId = params.churchId;
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [upiNumber, setUpiNumber] = useState(null);
//   const [expirationDate, setExpirationDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [addressData, setAddressData] = useState(null);
//   const [paymentStatus, setpaymentStatus] = useState("success");

//   const validateForm = () => {
//     let isValid = true;
//     setShowPaymentModal(true);
//     const newErrors = {};

//     if (!/^[a-zA-Z\s]+$/.test(user.fullName)) {
//       newErrors.fullName = "Please enter a valid full name";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.familyName)) {
//       newErrors.familyName = "Please enter a valid family name";
//       isValid = false;
//     }

//     if (!user.dateOfBirth) {
//       newErrors.dateOfBirth = "Please select a date of birth";
//       isValid = false;
//     }

//     if (!user.gender) {
//       newErrors.gender = "Please select a gender";
//       isValid = false;
//     }

//     if (!user.profession) {
//       newErrors.profession = "Please select a profession";
//       isValid = false;
//     }

//     if (
//       !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(user.email)
//     ) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     if (!/^[6-9]\d{9}$/.test(user.phoneNumber)) {
//       newErrors.phoneNumber =
//         "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//       isValid = false;
//     }

//     if (user.disability !== "Yes" && user.disability !== "No") {
//       newErrors.disability = "Please select Yes or No for disability";
//       isValid = false;
//     }

//     if (!user.subscription) {
//       newErrors.subscription = "Please select a subscription type";
//       isValid = false;
//     }

//     if (!user.profilePic) {
//       newErrors.profilePic = "Please upload a image";
//       isValid = false;
//     }

//     if (!/^[a-zA-Z\s]+$/.test(user.landmark)) {
//       newErrors.landmark = "Please enter a valid land mark";
//       isValid = false;
//     }

//     if (!user.maritalStatus) {
//       newErrors.maritalStatus = "Please select a marital status";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleOpenPaymentModal = () => {
//     setShowPaymentModal(true);
//   };

//   const handleClosePaymentModal = () => {
//     setShowPaymentModal(false);
//   };

//   const generateTransactionId = () => {
//     return Math.random().toString(36).substring(7);
//   };

//   var [alldata, setAlldata] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     setAlldata = user[0];
//     if (validateForm()) {
//       try {
//         console.log(user.paymentMethod);
//         const formData = new FormData();
//         formData.append("file", user.profilePic);
//         formData.append("fullName", user.fullName);
//         formData.append("familyName", user.familyName);
//         formData.append("dateOfBirth", user.dateOfBirth);
//         formData.append("gender", user.gender);
//         formData.append("age", user.age);
//         formData.append("profession", user.profession);
//         formData.append("email", user.email);
//         formData.append("phoneNumber", user.phoneNumber);
//         formData.append("disability", user.disability);
//         formData.append("nationality", user.nationality);
//         formData.append("landmark", user.landmark);
//         formData.append("maritalStatus", user.maritalStatus);
//         formData.append("husbandWifeName", user.husbandWifeName);
//         formData.append("fatherName", user.fatherName);
//         formData.append("motherName", user.motherName);
//         formData.append("subscription", user.subscription);
//         formData.append("subscriptionDuration", user.subscriptionDuration);
//         formData.append("subscriptionStartDate", user.subscriptionStartDate);
//         formData.append("subscriptionEndDate", user.subscriptionEndDate);
//         formData.append("price", user.price);
//         formData.append("discount", user.discount);
//         formData.append("paidAmount", user.paidAmount);
//         formData.append("churchId", churchId);
//         formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//         formData.append("cardNumber", user.cardNumber); // Added cardNumber
//         formData.append("upiNumber", user.upiNumber); // Added upiNumber
//         formData.append("expirationDate", user.expirationDate); // Added expirationDate
//         formData.append("cvv", user.cvv);

//         const response = await axios.post(
//           "http://localhost:9001/savePerson",
//           formData
//         );
//         console.log("Response:", response.data);
//         console.log("Church ID:", churchId);
//         const userid = localStorage.setItem("userid", response.data.id);
//       } catch (error) {
//         console.error("Error:", error);
//         setError(
//           "An error occurred while processing your request. Please try again later."
//         );
//       }
//     }
//   };

//   const submitCard = async (e) => {
//     console.log(alldata);
//     try {
//       // const formData = new FormData();
//       // formData.append("paymentMethod", user.paymentMethod); // Added paymentMethod
//       // console.log(formData);
//       const userid = localStorage.getItem("userid");
//       const data = {
//         paymentMethod,
//         paymentStatus,
//       };
//       const response = await axios.put(
//         `http://localhost:9001/updateUser/${userid}`,
//         data
//       );
//       console.log(response);
//       alert("payment success");
//     } catch (error) {
//       alert("some error occured");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubscriptionChange = (e) => {
//     setUser({ ...user, subscription: e.target.value });
//   };

//   const handleSubscriptionDurationChange = (e) => {
//     const duration = parseInt(e.target.value);
//     const pricePerYear = 3650; // Assuming the price per year is 3650 units
//     const discountPercentage = 0.9; // Assuming the discount is 90%
//     const price = duration * pricePerYear;
//     const discount = price * discountPercentage;
//     const paidAmount = price - discount;

//     setUser((prevUser) => ({
//       ...prevUser,
//       subscriptionDuration: duration,
//       subscriptionEndDate: calculateSubscriptionEndDate(
//         user.subscriptionStartDate,
//         duration
//       ),
//       price,
//       discount,
//       paidAmount,
//     }));
//   };

//   const calculateSubscriptionEndDate = (startDate, duration) => {
//     if (startDate && duration) {
//       const start = new Date(startDate);
//       const end = new Date(start.getTime());
//       end.setFullYear(end.getFullYear() + duration);
//       return end.toISOString().split("T")[0];
//     }
//     return "";
//   };

//   const handleSubscriptionStartDateChange = (e) => {
//     const startDate = e.target.value;
//     setUser({ ...user, subscriptionStartDate: startDate });
//     calculateSubscriptionEndDate(startDate, user.subscriptionDuration); // Pass startDate directly
//   };

//   const calculateAge = (dob) => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleDateOfBirthChange = (e) => {
//     const dob = e.target.value;
//     setUser({ ...user, dateOfBirth: dob, age: calculateAge(dob) });
//   };

//   const handleMaritalStatusChange = (e) => {
//     const status = e.target.value;
//     setUser({
//       ...user,
//       maritalStatus: status,
//       husbandWifeName: status === "Married" ? user.husbandWifeName : "",
//       fatherName: status === "Unmarried" ? user.fatherName : "",
//       motherName: status === "Unmarried" ? user.motherName : "",
//     });
//   };

//   const getClassName = (fieldName) => {
//     return errors[fieldName] ? "input-error" : "input-valid";
//   };

//   return (
//     <section className="Registerform">
//       <form onSubmit={handleSubmit}>
//         <div className="form-container">
//           <div className="">
//             <h2>Registration Form</h2>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "100%" }}>
//                 <label>
//                   Full Name:
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={user.fullName}
//                     onChange={handleChange}
//                     className={getClassName("fullName")}
//                     style={{ height: "6vh", borderRadius: "0.4rem" }}
//                   />
//                 </label>
//                 {errors.fullName && (
//                   <span className="error">{errors.fullName}</span>
//                 )}
//               </div>
//               <div style={{ marginLeft: "5%" }}>
//                 <label style={{ width: "120%" }}>
//                   Family Name:
//                   <input
//                     type="text"
//                     name="familyName"
//                     value={user.familyName}
//                     onChange={handleChange}
//                     className={getClassName("familyName")}
//                     style={{ height: "6vh", borderRadius: "0.4rem" }}
//                   />
//                 </label>
//                 {errors.familyName && (
//                   <span className="error">{errors.familyName}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <label>
//                   Date of Birth:
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={user.dateOfBirth}
//                     onChange={handleDateOfBirthChange}
//                     className={getClassName("dateOfBirth")}
//                     style={{
//                       height: "6vh",
//                       width: "114%",
//                       borderRadius: "0.4rem",
//                       marginTop: "-0.2%",
//                     }}
//                   />
//                 </label>
//                 {errors.dateOfBirth && (
//                   <span className="error">{errors.dateOfBirth}</span>
//                 )}
//               </div>
//               <div>
//                 <label>Gender:</label>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="male"
//                       checked={user.gender === "male"}
//                       onChange={handleChange}
//                     />
//                     Male
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="female"
//                       checked={user.gender === "female"}
//                       onChange={handleChange}
//                     />
//                     Female
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="others"
//                       checked={user.gender === "others"}
//                       onChange={handleChange}
//                     />
//                     Others
//                   </label>
//                 </div>
//                 {errors.gender && (
//                   <span className="error">{errors.gender}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div>
//                 <label>
//                   Age:
//                   <input
//                     type="number"
//                     name="age"
//                     value={user.age}
//                     onChange={handleChange}
//                     disabled
//                     style={{ width: "90%", height: "6vh" }}
//                   />
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   Profession:
//                   <select
//                     name="profession"
//                     value={user.profession}
//                     onChange={handleChange}
//                     className={getClassName("profession")}
//                     style={{
//                       width: "122%",
//                       height: "6vh",
//                       marginTop: "2%",
//                       marginLeft: "-2%",
//                     }}
//                   >
//                     <option value=""></option>
//                     <option value="job">Job</option>
//                     <option value="job">Student</option>
//                     <option value="business">Business</option>
//                     <option value="other">other</option>
//                   </select>
//                 </label>
//                 {errors.profession && (
//                   <span className="error">{errors.profession}</span>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: "flex" }}>
//               <div>
//                 <label>
//                   Email:
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     className={getClassName("email")}
//                     style={{
//                       width: "113%",
//                       borderRadius: "0.4rem",
//                       height: "6vh",
//                     }}
//                   />
//                 </label>
//                 {errors.email && <span className="error">{errors.email}</span>}
//               </div>
//               <div>
//                 <label style={{ marginLeft: "22%" }}>
//                   Phone Number:
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={user.phoneNumber}
//                     onChange={handleChange}
//                     className={getClassName("phoneNumber")}
//                     style={{
//                       marginLeft: "-1.5%",
//                       height: "6vh",
//                       width: "121%",
//                       borderRadius: "0.4rem",
//                     }}
//                   />
//                 </label>
//                 {errors.phoneNumber && (
//                   <span className="error">{errors.phoneNumber}</span>
//                 )}
//               </div>
//             </div>
//             <label>
//               Disability:
//               <input
//                 type="text"
//                 name="disability"
//                 value={user.disability}
//                 onChange={handleChange}
//                 className={getClassName("disability")}
//               />
//             </label>
//             {errors.disability && (
//               <span className="error">{errors.disability}</span>
//             )}

//             <label>
//               Nationality:
//               <input
//                 type="text"
//                 name="nationality"
//                 value={user.nationality}
//                 onChange={handleChange}
//                 className={getClassName("nationality")}
//               />
//             </label>
//             {errors.nationality && (
//               <span className="error">{errors.nationality}</span>
//             )}

//             <label>
//               Landmark:
//               <input
//                 type="text"
//                 name="landmark"
//                 value={user.landmark}
//                 onChange={handleChange}
//                 className={getClassName("familyName")}
//               />
//             </label>
//             {errors.landmark && (
//               <span className="error">{errors.landmark}</span>
//             )}

//             <label>
//               Marital Status:
//               <select
//                 value={user.maritalStatus}
//                 onChange={handleMaritalStatusChange}
//                 className={getClassName("maritalStatus")}
//                 name="maritalStatus"
//               >
//                 <option value="none"></option>
//                 <option value="Married">Married</option>
//                 <option value="Unmarried">Unmarried</option>
//               </select>
//               {errors.maritalStatus && (
//                 <span className="error">{errors.maritalStatus}</span>
//               )}
//             </label>

//             {user.maritalStatus === "Married" && (
//               <label>
//                 Husband/Wife Name:
//                 <input
//                   type="text"
//                   name="husbandWifeName"
//                   value={user.husbandWifeName}
//                   onChange={handleChange}
//                   className={getClassName("husbandWifeName")}
//                 />
//               </label>
//             )}
//             {user.maritalStatus === "Unmarried" && (
//               <div>
//                 <label>
//                   Father's Name:
//                   <input
//                     type="text"
//                     name="fatherName"
//                     value={user.fatherName}
//                     onChange={handleChange}
//                     className={getClassName("fatherName")}
//                   />
//                 </label>
//                 <label>
//                   Mother's Name:
//                   <input
//                     type="text"
//                     name="motherName"
//                     value={user.motherName}
//                     onChange={handleChange}
//                     className={getClassName("motherName")}
//                   />
//                 </label>
//               </div>
//             )}
//             <label>
//               Subscription Type:
//               <select
//                 value={user.subscription}
//                 className={getClassName("subscription")}
//                 onChange={handleSubscriptionChange}
//               >
//                 <option value="Select an option"></option>
//                 <option value="Free">Free</option>
//                 <option value="Premium">Premium</option>
//               </select>
//             </label>
//             {errors.subscription && (
//               <span className="error">{errors.subscription}</span>
//             )}

//             <label>
//               Subscription Duration:
//               <select
//                 value={user.subscriptionDuration}
//                 onChange={handleSubscriptionDurationChange}
//                 className={getClassName("subscriptionDuration")}
//               >
//                 <option value={0}> Select an Option</option>
//                 <option value={1}>1 year</option>
//                 <option value={2}>2 years</option>
//                 <option value={5}>5 years</option>
//               </select>
//             </label>

//             <label>
//               Subscription Start Date:
//               <input
//                 type="date"
//                 name="subscriptionStartDate"
//                 value={user.subscriptionStartDate}
//                 onChange={handleSubscriptionStartDateChange}
//               />
//             </label>
//             <label>
//               Subscription End Date:
//               <input
//                 type="date"
//                 name="subscriptionEndDate"
//                 value={user.subscriptionEndDate}
//                 readOnly
//               />
//             </label>

//             <label>
//               Price:
//               <input
//                 type="number"
//                 name="price"
//                 value={user.price}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Discount:
//               <input
//                 type="number"
//                 name="discount"
//                 value={user.discount}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Final Price:
//               <input
//                 type="number"
//                 name="paidAmount"
//                 value={user.paidAmount}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Profile Picture:
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="profilePic"
//                 onChange={(e) =>
//                   setUser({ ...user, profilePic: e.target.files[0] })
//                 }
//                 className={getClassName("profilePic")}
//               />
//             </label>
//             {errors.profilePic && (
//               <span className="error">{errors.profilePic}</span>
//             )}

//             <button type="submit">Register</button>
//           </div>
//         </div>

//         <Modal
//           open={showPaymentModal}
//           onClose={() => setShowPaymentModal(false)}
//         >
//           <div className="container" style={{ marginTop: "-5%" }}>
//             <div className="row">
//               <div className="col-6">
//                 <Container
//                   className="payment-container w-100"
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     borderRadius: "15px",
//                     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                     width: "40%",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ display: "flex", marginLeft: "-40%" }}>
//                     <div>
//                       <h2
//                         className="payment-heading-center"
//                         style={{
//                           color: "black",
//                           marginLeft: "-15%",
//                           marginRight: "-200%",
//                         }}
//                       >
//                         Payment Details
//                       </h2>
//                     </div>
//                     <div style={{ marginLeft: "70%", marginRight: "-150%" }}>
//                       {success && (
//                         <Button
//                           className="mt-4"
//                           variant="primary"
//                           style={{ marginLeft: "37%", borderRadius: "2rem" }}
//                         >
//                           Print Receipt
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                   <br />
//                   <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="paymentMethod">
//                       <Form.Label
//                         style={{ marginLeft: "1%", fontSize: "1.2rem" }}
//                       >
//                         Select Payment Method
//                       </Form.Label>{" "}
//                       <br />
//                       <Form.Control
//                         as="select"
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         name="paymentMethod"
//                         required
//                         style={{ marginLeft: "5%" }}
//                       >
//                         <option value="" disabled>
//                           {" "}
//                           <br />
//                           Select Payment Method
//                         </option>
//                         <option value="credit_card">Credit Card</option>
//                         <option value="debit_card">Debit Card</option>
//                         <option value="upi">UPI</option>
//                       </Form.Control>
//                     </Form.Group>{" "}
//                     <br />
//                     {paymentMethod === "upi" && (
//                       <Form.Group controlId="upiNumber">
//                         <Form.Label
//                           style={{ marginLeft: "7%", fontSize: "1.2rem" }}
//                         >
//                           UPI Number
//                         </Form.Label>{" "}
//                         <br />
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter UPI Number"
//                           value={user.upiNumber}
//                           onChange={handleChange}
//                           name="upiNumber"
//                           required
//                           style={{ marginLeft: "5%" }}
//                         />
//                       </Form.Group>
//                     )}
//                     {(paymentMethod === "credit_card" ||
//                       paymentMethod === "debit_card") && (
//                       <>
//                         <Form.Group controlId="cardNumber">
//                           <Form.Label
//                             style={{ marginLeft: "6%", fontSize: "1.2rem" }}
//                           >
//                             Card Number
//                           </Form.Label>{" "}
//                           <br />
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter card number"
//                             value={user.cardNumber}
//                             onChange={handleChange}
//                             name="cardNumber"
//                             required
//                             style={{ marginLeft: "5%" }}
//                           />
//                         </Form.Group>{" "}
//                         <br />
//                         <Form.Group controlId="expirationDate">
//                           <Form.Label
//                             style={{ marginLeft: "3%", fontSize: "1.2rem" }}
//                           >
//                             Expiration Date
//                           </Form.Label>
//                           <br />
//                           <Form.Control
//                             type="text"
//                             placeholder="MM/YY"
//                             value={user.expirationDate}
//                             onChange={handleChange}
//                             name="expirationDate"
//                             required
//                             style={{ marginLeft: "5%" }}
//                           />
//                         </Form.Group>{" "}
//                         <br />
//                         <Form.Group controlId="cvv">
//                           <Form.Label
//                             style={{ marginLeft: "2%", fontSize: "1.2rem" }}
//                           >
//                             CVV
//                           </Form.Label>{" "}
//                           <br />
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter CVV"
//                             value={user.cvv}
//                             onChange={handleChange}
//                             name="cvv"
//                             required
//                             style={{ marginLeft: "5%" }}
//                           />
//                         </Form.Group>
//                       </>
//                     )}
//                     <br />
//                     <div className="payment-heading-center">
//                       <Button
//                         onClick={submitCard}
//                         className="mt-4"
//                         variant="primary"
//                         type="submit"
//                         disabled={loading}
//                         style={{ marginLeft: "5%" }}
//                       >
//                         {loading ? "Processing..." : "Submit Payment"}
//                       </Button>
//                     </div>{" "}
//                     <br />
//                     {error && (
//                       <Alert
//                         variant="danger"
//                         style={{ color: "red", marginLeft: "32%" }}
//                       >
//                         {error}
//                       </Alert>
//                     )}{" "}
//                     {/* Display error alert */}
//                     {success && (
//                       <Alert
//                         variant="success"
//                         style={{ color: "green", marginLeft: "5%" }}
//                       >
//                         Payment successful!
//                       </Alert>
//                     )}
//                   </Form>
//                 </Container>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </form>
//     </section>
//   );
// }

// export default UserRegister;
