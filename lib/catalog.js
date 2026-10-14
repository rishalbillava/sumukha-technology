export const locations = ['Kundapur', 'Udupi', 'Mangalore', 'Shivamogga', 'Bhatkal'];
export const products = [
 { id: 'count', number: '01', category: 'COUNT', name: 'Currency Counting Machine', image: 'currency-counter.webp', width: 1312, height: 1199, tagline: 'Simplify your daily cash count.', title: 'Make every cash count simpler.', description: 'A dedicated currency counter for your daily cash handling. Talk to us about the available configurations and find an option that suits your counter, office or cash desk.', points: ['Daily note counting', 'Countertop cash handling', 'Available configurations'] },
 { id: 'sort', number: '02', category: 'SORT', name: 'Sorting Machine', image: 'sorting-machine.webp', width: 1400, height: 933, tagline: 'Bring order to your cash desk.', title: 'A little more order. A lot more clarity.', description: 'Explore sorting machines for organising your cash processing workflow. Our team can help you understand model-specific functions and the options available.', points: ['Cash organisation', 'Sorting workflows', 'Model-specific guidance'] },
 { id: 'verify', number: '03', category: 'VERIFY', name: 'FND — Fake Note Detector Machine', image: 'fake-note-detector.webp', width: 1400, height: 933, tagline: 'Take a closer look at every note.', title: 'Take a closer look at your cash.', description: 'Bring note checking into your daily routine with a fake note detector. Ask us about detection methods, supported notes and the right machine for your business.', points: ['Note checking', 'Detection options', 'Product information'] }
];
export const configurations = [
 { category: 'bundle', image: 'bundlecountmachine1.jpeg', name: 'Bundle Counting Machine', number: '01', width: 800, height: 800 },
 { category: 'value', image: 'valuecountmachine1.jpeg', name: 'Value Note Counting Machine', number: '01', width: 735, height: 605 },
 { category: 'sorting', image: 'sortingmachine.jpeg', name: 'Cash Sorting Machine', number: '', width: 736, height: 736 },
 { category: 'bundle', image: 'bundlecountmachine2.jpeg', name: 'Bundle Counting Machine', number: '02', width: 1024, height: 1024 },
 { category: 'value', image: 'valuecountmachine2.jpeg', name: 'Value Note Counting Machine', number: '02', width: 736, height: 981 }
];
export const configurationName = c => c.name + (c.number ? ' — Configuration ' + c.number : '');
export const enquiryOptions = ['Help me choose a machine', ...products.map(p => p.name), ...configurations.map(configurationName)];
export function enquiryMailto(values) {
 const body = ['Hello Sumukha Technology,', '', 'I would like information about: ' + values.product, 'Location: ' + (values.location || 'Not specified'), '', 'Name: ' + values.name, 'Phone: ' + values.phone, 'Email: ' + values.email, '', 'Requirements: ' + values.message].join('\n');
 return 'mailto:sumukhatechnology22@gmail.com?subject=' + encodeURIComponent('Machine enquiry: ' + values.product) + '&body=' + encodeURIComponent(body);
}
