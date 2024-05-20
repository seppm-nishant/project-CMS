import { Router } from "express";
import addRow from "../controllers/addRow";
import addTable from "../controllers/addTable";
import getRows from "../controllers/getRows";
import { greeting } from "../controllers/greeting";
import getTables from "../controllers/getTables";
import removeTable from "../controllers/removeTable";
import removeRow from "../controllers/removeRow";
import editRow from "../controllers/editRow";
import getRow from "../controllers/getRow";

// create routes here...

const router = Router();

router.get("/", greeting);

router.post("/addTable", addTable);
router.post("/addRow", addRow);

router.post("/getRow", getRow);
router.get("/getRows/:tableName", getRows);
router.get("/getTables", getTables);

router.post("/removeTable", removeTable);
router.post("/removeRow", removeRow);
router.post("/editRow", editRow);

export default router;
