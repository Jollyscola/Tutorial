import { Connection, dates } from "forms42core";

/*
  MIT License

  Copyright © 2023 Alex Høffner

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the “Software”), to deal in the Software without
  restriction, including without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or
  substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export class DataLoader
{
   public static employees:any = null;
   public static departments:any = null;

   public static async load() : Promise<void>
   {
      let conn:Connection = new Connection();

		await DataLoader.loadEmpData(conn);
		await DataLoader.loadDeptData(conn);
   }

   private static async loadDeptData(conn:Connection) : Promise<void>
   {
      let response:any = await conn.get("/data/Departments.json");
		DataLoader.departments = response.table;
      console.log("loaded "+response.table.length+" departments");
   }

   private static async loadEmpData(conn:Connection) : Promise<void>
   {
      let response:any = await conn.get("/data/Employees.json");

		for (let i = 0; i < response.table.length; i++)
			response.table[i][5] = dates.parse(response.table[i][5],"YYYY-MM-DD");

		DataLoader.employees = response.table;
      console.log("loaded "+response.table.length+" employees");
   }
}