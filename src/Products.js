import React from "react";
import Highlighter from "react-highlight-words";
import placeholder from "./placeholder.jpg";
const Products = ({ product, query, loading }) => {
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row mx-auto">
          {loading ? (
            <div className="d-flex justify-content-center align-content-center ">
              <div
                className="spinner-border text-dark"
                role="status"
                style={{ height: "5rem", width: "5rem" }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            product?.map((pro) => (
              <div
                key={pro.id}
                className="col-lg-3 col-md-4 col-sm-6 col-12 col-xl-3  my-2 mx-auto"
              >
                <div className="card">
                  <img
                    src={pro?.image_url || placeholder}
                    className="card-img-top"
                    alt={pro.title}
                    height={350}
                  />
                  <div className="card-body">
                    <h5 className="card-title text__el  text-center">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        caseSensitive={false}
                        highlightStyle={{ backgroundColor: "#ffd54f" }}
                        autoEscape={true}
                        textToHighlight={pro?.title || ""}
                      />
                    </h5>
                    <p className="text-normal">$ {pro?.description}</p>

                    <a href="tel:">{pro?.contact_no || "-"}</a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
