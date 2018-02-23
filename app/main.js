// import code from other files like this
const SDR = require('./SDR');




// const sdr1 = SDR.createSDR(16, 4);
const sdr1 = SDR.createSDR();
const sdr2 = [...sdr1];

SDR.getInfo(sdr1);
SDR.injectNoise(sdr2);
SDR.getInfo(sdr2);
