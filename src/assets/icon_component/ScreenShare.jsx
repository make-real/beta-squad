import React from "react";

const ScreenShare = ({ className, style, onClick, active }) => {
    return (
        <svg
            className={className}
            style={style}
            onClick={onClick}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.4"
                d="M2.75 9V8C2.75 5.65421 4.65421 3.75 7 3.75H17C19.3458 3.75 21.25 5.65421 21.25 8V16C21.25 18.3458 19.3458 20.25 17 20.25H16H7C4.65421 20.25 2.75 18.3458 2.75 16V9Z"
                fill={active ? "#2F42ED" : "#818892"}
                stroke="#2135E8"
                strokeWidth="1.5"
            />
            <path
                d="M9.22744 7.77512C9.22697 7.77533 9.22647 7.77559 9.22596 7.77591L9.22489 7.77598C9.2239 7.77569 9.2232 7.77557 9.22297 7.77554L9.22499 7.77579C9.22534 7.77511 9.22569 7.7743 9.226 7.77338C9.22646 7.77205 9.22662 7.77109 9.22665 7.7708C9.22647 7.77231 9.2266 7.77283 9.22675 7.77338C9.22689 7.77387 9.22712 7.77447 9.22744 7.77512ZM9.22744 7.77512C9.22761 7.77546 9.22781 7.77582 9.22803 7.77617C12.9442 8.24946 15.6697 10.9732 16.1453 14.6884C16.1454 14.6886 16.1456 14.6888 16.1458 14.6891C16.1461 14.6893 16.1464 14.6897 16.1468 14.69C16.1468 14.69 16.1468 14.69 16.1468 14.69H16.147H16.1473H16.1475H16.1476C15.6592 10.9515 12.9572 8.25209 9.23083 7.77445C9.22974 7.77436 9.22928 7.77447 9.22881 7.77461C9.22841 7.77472 9.22794 7.77489 9.22744 7.77512Z"
                fill={active ? "#2F42ED" : "#818892"}
                stroke="#2135E8"
                strokeWidth="1.5"
            />
            <path
                d="M8.33712 10.7244L8.33712 10.7244L8.33333 10.7239C8.20448 10.7082 8.10168 10.5837 8.11912 10.4408C8.13477 10.3124 8.25844 10.2098 8.40081 10.2264C11.2544 10.598 13.3252 12.66 13.6966 15.5221C13.7123 15.6565 13.6219 15.7742 13.5038 15.8002H13.5036H13.5034H13.5032H13.503H13.5028H13.5026H13.5024H13.5022H13.502H13.5018H13.5016H13.5014H13.5012H13.501H13.5008H13.5006H13.5004H13.5002H13.5H13.4998H13.4996H13.4994H13.4991H13.4989H13.4987H13.4985H13.4983H13.4981H13.4979H13.4977H13.4975H13.4973H13.4971H13.4969H13.4967H13.4965H13.4963H13.4961H13.4959H13.4957H13.4955H13.4953H13.4951H13.4948H13.4946H13.4944H13.4942H13.494H13.4938H13.4936H13.4934H13.4932H13.493H13.4928H13.4926H13.4924H13.4922H13.492H13.4918H13.4916H13.4914H13.4912H13.491H13.4907H13.4905H13.4903H13.4901H13.4899H13.4897H13.4895H13.4893H13.4891H13.4889H13.4887H13.4885H13.4883H13.4881H13.4879H13.4877H13.4875H13.4873H13.4871H13.4869H13.4866H13.4864H13.4862H13.486H13.4858H13.4856H13.4854H13.4852H13.485H13.4848H13.4846H13.4844H13.4842H13.484H13.4838H13.4836H13.4834H13.4832H13.483H13.4828H13.4826H13.4824H13.4822H13.4819H13.4817H13.4815H13.4813H13.4811H13.4809H13.4807H13.4805H13.4803H13.4801H13.4799H13.4797H13.4795H13.4793H13.4791H13.4789H13.4787H13.4785H13.4783H13.4781H13.4779H13.4777H13.4775H13.4773H13.4771H13.4769H13.4767H13.4765H13.4763H13.4761H13.4759H13.4757H13.4755H13.4753H13.4751H13.4749H13.4747H13.4744H13.4742H13.474H13.4738H13.4736H13.4734H13.4732H13.473H13.4728H13.4726H13.4724H13.4722H13.472H13.4718H13.4716H13.4714H13.4712H13.471H13.4708H13.4706H13.4704H13.4702H13.47H13.4698H13.4696H13.4694H13.4692H13.469H13.4688H13.4686H13.4684H13.4682H13.468H13.4679H13.4677H13.4675H13.4673H13.4671H13.4669H13.4667H13.4665H13.4663H13.4661H13.4659H13.4657H13.4655H13.4653H13.4651H13.4649H13.4647H13.4645H13.4643H13.4641H13.4639H13.4637H13.4635H13.4633H13.4631H13.4629H13.4627H13.4625H13.4623H13.4622H13.462H13.4618H13.4616H13.4614H13.4612H13.461H13.4608H13.4606H13.4604H13.4602H13.46H13.4598H13.4596H13.4594H13.4592H13.4591H13.4589H13.4587H13.4585H13.4583H13.4581H13.4579H13.4577H13.4575H13.4573H13.4571H13.4569H13.4568H13.4566H13.4564H13.4562H13.456H13.4558H13.4556H13.4554H13.4552H13.455H13.4549H13.4547H13.4545H13.4543H13.4541H13.4539H13.4537H13.4535H13.4534H13.4532H13.453H13.4528H13.4526H13.4524H13.4522H13.452H13.4519H13.4517H13.4515H13.4513H13.4511H13.4509H13.4507H13.4506H13.4504H13.4502H13.45H13.4498H13.4496H13.4495H13.4493H13.4491H13.4489H13.4487H13.4485H13.4484H13.4482H13.448H13.4478H13.4476H13.4474H13.4473H13.4471H13.4469H13.4467H13.4465H13.4464H13.4462H13.446H13.4458H13.4456H13.4455H13.4453H13.4451H13.4449H13.4447H13.4446H13.4444H13.4442H13.444H13.4439H13.4437H13.4435H13.4433H13.4432H13.443H13.4428C13.325 15.8002 13.2155 15.7074 13.1984 15.5841C12.8587 12.9808 10.9525 11.0636 8.33712 10.7244Z"
                fill={active ? "#2F42ED" : "#818892"}
                stroke="#2135E8"
            />
            <path
                d="M10.3911 16.81C10.0211 16.81 9.70107 16.53 9.65107 16.16C9.52107 15.14 8.78107 14.4 7.76107 14.27C7.35107 14.22 7.06107 13.84 7.11107 13.43C7.16107 13.02 7.54107 12.73 7.95107 12.78C9.64107 13 10.9211 14.28 11.1411 15.97C11.1911 16.38 10.9011 16.76 10.4911 16.81C10.4611 16.81 10.4211 16.81 10.3911 16.81Z"
                fill={active ? "#2F42ED" : "#818892"}
            />
        </svg>
    );
};

export default ScreenShare;
