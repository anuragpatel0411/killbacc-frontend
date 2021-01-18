import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/app/classes/faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  faqs: Array<FAQ>= [
    {
      question: "How can I get a floor cleaner sample?",
      answer: "Please provide your contact details on our <a href='http://killbacc.com/home#contact'>CONTACT US</a> Page. Our sales executive will contact you within 24 hours.",
      show: false,
      icon: 'fa-angle-down'
    },
    {
      question: "How can we buy your Product in our city?",
      answer: "You can buy product by distributer or retailer in your own city.",
      show: false,
      icon: 'fa-angle-down'
    },
    {
      question: "Is this product is certified?",
      answer: "Yes, our product is <b>ISO 9001:2015</b> certified.",
      show: false,
      icon: 'fa-angle-down'
    },
    {
      question: "How can I become a distributors?",
      answer: "Please fill in the short information ,by clicking <a href='http://killbacc.com/home#contact'>CONTACT US</a>. We will contact you as soon as we receive your query.",
      show: false,
      icon: 'fa-angle-down'
    },
  ];
  faqShow: Array<boolean>;

  ngOnInit(): void {
  }
}
