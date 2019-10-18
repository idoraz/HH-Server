"use strict";

import async from "async";
import request from "request";
import { Response, Request, NextFunction } from "express";
import * as http from "http";
const fs = require("fs");
const PDFParser = require("pdf2json");
const moment = require("moment");
const zillow = require("node-zillow");

const BIDLIST_FILE_PATH = "./data/houses/blHousing.pdf";
const POSTPENMENTS_FILE_PATH = "./data/houses/psHousing.pdf";
const PARSED_JSON_PATH = "./data/pdf2json/";
const POST_PDF_FILE_PATH = "./data/houses/psHousing.pdf";
const BID_PDF_FILE_PATH = "./data/houses/blHousing.pdf";
const LAW_FIRMS_EXCEL = "./data/lawFirms/lawFirms.xlsx";
const LAW_FIRMS_JSON = "./data/lawFirms/lawFirms.json";
const BIDLIST_PDF_URL = "http://www.sheriffalleghenycounty.com/pdfs/bid_list/bid_list.pdf";
const POSTPONEMENTS_PDF_URL = "http://www.sheriffalleghenycounty.com/pdfs/bid_list/postpone.pdf";
const JUDGMENTS_URL = "http://www.pittsburghlegaljournal.org/subscribe/pn_sheriffsale.php";
// const SALE_RESULTS_PDF_URL = 'http://www.sheriffalleghenycounty.com/pdfs/bid_list/sale_results.pdf';
const ZILLOW_API_TOKEN = "X1-ZWz18uacwnt823_728x4";
const ZILLOW_API_TOKEN_YOTAM = "X1-ZWz1f5h9rt9de3_47pen";
const ZILLOW_API_TOKEN_YOTAM2 = "X1-ZWz19sgwikp5or_a1050";


export let getHousesDetails = (req: Request, res: Response) => {

  res.send("Houses Details");
};

export let getHousesPDF = (req: Request, res: Response) => {
  console.log(`(${moment(Date.now()).format("DD/MM/YYYY HH:mm:ss")}) Downloading pdf files to server...`);

  const blFile = fs.createWriteStream(BIDLIST_FILE_PATH);
  const psFile = fs.createWriteStream(POSTPENMENTS_FILE_PATH);

  const bidListRequest = http.get(BIDLIST_PDF_URL, function (response) {
    console.log(`(${moment(Date.now()).format("DD/MM/YYYY HH:mm:ss")}) Bid List pdf file was downloaded!`);
    response.pipe(blFile);

    const postponementsRequest = http.get(POSTPONEMENTS_PDF_URL, function (response) {

      console.log(`(${moment(Date.now()).format("DD/MM/YYYY HH:mm:ss")}) Postponements pdf file was downloaded!`);
      response.pipe(psFile);
      res.send("Files downloaded successfully!");
    });

  });
};

export let parseHouses = (req: Request, res: Response) => {
  console.log(`(${moment(Date.now()).format("DD/MM/YYYY HH:mm:ss")}) Parsing houses from pdf to json...`);

  const blPdfParser = new PDFParser();
  const psPdfParser = new PDFParser();

  blPdfParser.on("pdfParser_dataError", (errData: any) => {
    console.error(errData.data.message);
    res.send("failed");
  });
  blPdfParser.on("pdfParser_dataReady", (blPdfData: any) => {
    // fs.writeFile("./pdf2json/blHousing.json", JSON.stringify(blPdfData));
    fs.writeFile(`${PARSED_JSON_PATH}blHousing.fields.json`, JSON.stringify(blPdfParser.getAllFieldsTypes()));
    psPdfParser.loadPDF(POST_PDF_FILE_PATH);

  });
  psPdfParser.on("pdfParser_dataError", (errData: any) => {
    console.error(errData.parserError);
    res.send("failed");
  });
  psPdfParser.on("pdfParser_dataReady", (psPdfData: any) => {
    fs.writeFile(`${PARSED_JSON_PATH}psHousing.json`, JSON.stringify(psPdfData));
    res.send("success");
  });

  blPdfParser.loadPDF(BID_PDF_FILE_PATH);

};

export let getHousesJSON = (req: Request, res: Response) => {

  // TODO: merge the json files and send as one
  const file = `${PARSED_JSON_PATH}blHousing.json`;
  const housing = require(file);

  res.send(housing);
  console.log(`(${moment(Date.now()).format("DD/MM/YYYY HH:mm:ss")}) Downloaded Bid List JSON`);
};