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

import { DataLoader } from './DataLoader';
import { MasterDetail } from './countries/MasterDetail';
import { FormsModule as FormsCoreModule, FormsPathMapping } from 'forms42core';

import { Route } from  './Route';
import { Intro } from './Tour/Intro';
import { youtubeSlider } from './youtube';


@FormsPathMapping
([
   {class: MasterDetail, path: "masterdetail"}
])

export class FormsModule extends FormsCoreModule
{
   intro:Intro = null;
   route:Route = null;
   gallery:youtubeSlider = null;
   constructor()
   {
      super();
      this.setup();
     
       
        this.route = new Route();
        this.intro = new Intro();
        this.gallery = new youtubeSlider(this.route.contentDiv);
   }
  private async setup() 
  {
    try {
      await DataLoader.load();
      let parse: boolean = true;

      if (parse) {
        this.parse(document.body);
      } else {
        let view: HTMLElement = document.querySelector('form');
        await this.createform(MasterDetail, view);
      }
    } catch (error) {
      console.error('Error during setup:', error);
    }
  }
}