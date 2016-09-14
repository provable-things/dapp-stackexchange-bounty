import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/index';
import { QuestionsService } from './questions/index';
import { Web3Service } from './web3/index';
import { MathJaxDirective } from './mathjax/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [NavbarComponent, MathJaxDirective],
  exports: [NavbarComponent, MathJaxDirective,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [QuestionsService, Web3Service] // services go here
    };
  }
}
