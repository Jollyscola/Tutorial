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

import { Lov } from "./Lov";
import { Employees } from "../datasources/Employees";
import { Departments } from "../datasources/Departments";
import { Block, Form, Key, datasource } from "forms42core";


@datasource("employees",Employees)
@datasource("departments",Departments)

export class MasterDetail extends Form
{
	constructor(page:HTMLElement)
	{
		super(page);

		let detail:Key = new Key("employees","department_id");
		let master:Key = new Key("departments","department_id");

		this.link(master,detail);
		this.setListOfValues(Lov.get(),"employees","last_name");
	}

	public async sort(block:string, column:string) : Promise<boolean>
	{
		let blk:Block = this.getBlock(block);

		if (!blk.empty())
		{
			blk.datasource.sorting = column;
			await blk.reQuery();
		}

		return(true);
	}
}