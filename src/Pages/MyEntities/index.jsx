import React from "react";
import { Card } from "primereact/card";
import ReactCountryFlag from "react-country-flag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

import "./myentities.scss";
import MyEntityController from './MyEntityController'

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "data set",
      data: [30, 45, 60, 75, 50, 35, 45],
      fill: true,
      borderColor: "#189405",
      backgroundColor: "rgba(14, 156, 255, 0.2)",
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Line Chart with Shaded Area",
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: "Months",
      },
    },
    y: {
      title: {
        display: false,
        text: "Value",
      },
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

const MyEntities = () => {
  const {  myEntities,
    allentites,
    entitycountrylist,
    entitydatelist,
    headcount,
    detection_rate,
    gross_cost,
    accuracy_rate,
    handleChangeEntity,
    handleChangeCountry,
    handleDownloadReport,} = MyEntityController();

  return (
    <>
      <h1 className="entity-heading">My Entities</h1>

      <div className="grid">
        {myEntities?.map((card) => (
          <div
            key={card.id}
            className="col-12 xs:col-12 sm:col-6 md:col-6 lg:col-4 custom-xl-5"
          >
            <Card className="entity-card">
              <div className="card-content">
                <p className="p-flag-country">
                  <ReactCountryFlag
                    countryCode={card.countryId_of_incorporation}
                    svg
                    style={{ width: "15px", height: "12px", marginRight: 2 }}
                  />{" "}
                  {card.country_of_incorporation}
                </p>
                <p className="p-card-title">{card.registered_name}</p>
                <a href={`/my-entities/details/${card.id}`} className="p-card-details">View Details</a>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <h1 className="entity-sub-heading">Entity Performance Overview</h1>

      <div className="entity-filter-container">
        <p className="entity-filter">Filter By</p>
        <Dropdown
          className="custom-dropdown"
          options={allentites}
          optionLabel="name"
          placeholder="All Entities"
          onChange={handleChangeEntity}
        />
        <Dropdown
          className="custom-dropdown"
          options={entitycountrylist}
          // optionLabel="name"
          placeholder="All Countries"
          onChange={handleChangeCountry}
        />
        <Dropdown
          className="custom-dropdown"
          options={entitydatelist}
          // optionLabel="name"
          placeholder="YTD"
          onChange={handleChangeCountry}
        />
        <Button
          label="Download Report"
          icon="pi pi-download"
          className="download-btn"
          iconPos="right"
          onClick={handleDownloadReport}
        />
      </div>


      <div className="grid pt-4">
        <div className="col-12 xs:col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3">
          <Card className="performance-card">
            <div className="card-content">
              <p className="rate">{gross_cost?.rate}</p>
              <p className="rate-heading">Gross Cost</p>
              <div className="text-with-icon">
                <p className={`${gross_cost?.month_rate_type === 'up' ? 'green-icon' : 'red-icon'}`}>
                  <i className={`${gross_cost?.month_rate_type === 'up' ? 'pi pi-arrow-up custom-up-icon' : 'pi pi-arrow-down custom-down-icon'}`} ></i>{gross_cost?.month_rate}
                </p>
                <p> vs Last Month</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 xs:col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3">
          <Card className="performance-card">
            <div className="card-content">
              <p className="rate">{headcount?.rate}</p>
              <p className="rate-heading">Headcount</p>
              <div className="text-with-icon">

                <p className={`${headcount?.month_rate_type === 'up' ? 'green-icon' : 'red-icon'}`}>
                  <i className={`${headcount?.month_rate_type === 'up' ? 'pi pi-arrow-up custom-up-icon' : 'pi pi-arrow-down custom-down-icon'}`} ></i>{headcount?.month_rate}
                </p>

                <p> vs Last Month</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 xs:col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3">
          <Card className="performance-card">
            <div className="card-content">
              <p className="rate">{detection_rate?.rate}</p>
              <p className="rate-heading">Variance Detection Rate</p>
              <div className="text-with-icon">
                <p className={`${detection_rate?.month_rate_type === 'up' ? 'green-icon' : 'red-icon'}`}>
                  <i className={`${detection_rate?.month_rate_type === 'up' ? 'pi pi-arrow-up custom-up-icon' : 'pi pi-arrow-down custom-down-icon'}`} ></i>{detection_rate?.month_rate}
                </p>
                <p> vs Last Month</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 xs:col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3">
          <Card className="performance-card">
            <div className="card-content">
              <p className="rate">{accuracy_rate?.rate}</p>
              <p className="rate-heading">Accuracy Rate</p>
              <div className="text-with-icon">
                <p className={`${accuracy_rate?.month_rate_type === 'up' ? 'green-icon' : 'red-icon'}`}>
                  <i className={`${accuracy_rate?.month_rate_type === 'up' ? 'pi pi-arrow-up custom-up-icon' : 'pi pi-arrow-down custom-down-icon'}`} ></i>{accuracy_rate?.month_rate}
                </p>
                <p> vs Last Month</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <h1 className="entity-cost-heading">Cost of Operations</h1>
      <div className="card chart-container" >
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default MyEntities;
