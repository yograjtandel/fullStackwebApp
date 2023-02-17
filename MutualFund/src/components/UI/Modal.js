import React from "react";
// import close from "../../assets/icons/close.png";
import SvgCoinsSvGs148 from "../../assets/iconComponents/CoinsSvGs148";
const Modal = (props) => {
  const dialogCloseHandler = (event) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };
  //   return (
  //     <div
  //       className={`card-spacing modal-style popup d-flex justify-content-center align-item-center ${
  //         props.isModalOpen ? "d-block" : "d-none"
  //       }`}
  //       onClick={dialogCloseHandler}
  //     >
  //       <div
  //         className={`card pb-4 ${
  //           props.position ? "align-self-" + props.position : ""
  //         }`}
  //         style={{
  //           width: props.width ? props.width : "fit-content",
  //           height: "fit-content"
  //         }}
  //       >
  //         <div className="row bg-light p-0 m-0">
  //           <div className="col-md-12  d-flex justify-content-between align-items-center">
  //             <div className="col-md-12 fund-row-container d-flex justify-between align-items-center">
  //               <div className="col-md-8 d-flex align-items-center">
  //                 {/* <div className="fund-image">
  //                   <SvgCoinsSvGs148 />
  //                 </div>
  //                 <div className="fund-data-container">
  //                   <div className="">
  //                     <div className="fund-name">
  //                       <a href="/mf/fund/INF174K01LS2">
  //                         <span>ICICI Prudential Business Cycle Fund</span>
  //                       </a>
  //                     </div>
  //                     <div className="fund-additional-details">
  //                       <span className="text-12 text-grey dividend">
  //                         <span>Growth</span>
  //                       </span>
  //                       <span className="text-12 text-grey scheme">
  //                         <span>Equity</span>
  //                       </span>
  //                       <span className="text-12 text-grey sub-scheme">
  //                         <span>Flexi Cap</span>
  //                       </span>
  //                       <div></div>
  //                     </div>
  //                   </div>
  //                   <div className=""></div>
  //                 </div> */}
  //               </div>
  //               <div
  //                 className="close-btn-wrapper col-md-4 d-flex justify-content-end"
  //                 onClick={dialogCloseHandler}
  //               >
  //                 <button className="btn" onClick={dialogCloseHandler}>
  //                   X
  //                 </button>
  //               </div>
  //             </div>

  //             {/* <div className="wishlist-logo">
  //                 {" "}
  //                 <SvgHeartBlack />
  //               </div>
  //               <div className="wishlist">
  //                 <h5 className="d-inline">WISHLIST</h5> <span> (0)</span>
  //                 <p className="d-block mb-0">
  //                   Here are the funds you have shortlisted
  //                 </p>
  //               </div> */}
  //           </div>
  //         </div>
  //         {props.children}
  //       </div>
  //     </div>
  //   );
  return (
    <>
      <div
        className={`modal fade ${
          props.isModalOpen ? "show d-flex justify-content-center align-item-center" : "d-none"
        }`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={dialogCloseHandler}
      >
        <div
          className="modal-dialog d-flex justify-content-center align-items-center"
          style={{ width: props.width ? props.width : "fit-content" ,maxWidth:"100%" , height:"auto"}}
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              {/* <h5 className="modal-title " id="exampleModalLabel">
                Sign In
              </h5> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={dialogCloseHandler}
              ></button>
            </div>
            <div className="modal-body">{props.children}</div>
            {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
