use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
pub struct MachineConfig {
    pub reflector: String,
    pub rotors: Vec<MachineRotorConfig>,
    pub plugboard: Vec<String>
}

#[derive(Serialize, Deserialize)]
pub struct MachineRotorConfig {
    pub rtype: String,
    pub position: String
}

pub struct Config {
    pub rotors: HashMap<String, RotorConfig>,
    pub reflectors: HashMap<String, Vec<String>>
}

pub struct RotorConfig {
    pub map: String,
    pub step: char
}

impl Config {
    pub fn new() -> Config {
        let mut rts = HashMap::new();
        rts.insert("I".to_string(), RotorConfig { map: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".to_string(), step: 'R' });
        rts.insert("II".to_string(), RotorConfig { map: "AJDKSIRUXBLHWTMCQGZNPYFVOE".to_string(), step: 'F' });
        rts.insert("III".to_string(), RotorConfig { map: "BDFHJLCPRTXVZNYEIWGAKMUSQO".to_string(), step: 'W' });
        rts.insert("IV".to_string(), RotorConfig { map: "ESOVPZJAYQUIRHXLNFTGKDCMWB".to_string(), step: 'K' });
        rts.insert("V".to_string(), RotorConfig { map: "VZBRGITYUPSDNHLXAWMJQOFECK".to_string(), step: 'A' });
        rts.insert("VI".to_string(), RotorConfig { map: "JPGVOUMFYQBENHZRDKASXLICTW".to_string(), step: 'N' });
        rts.insert("VII".to_string(), RotorConfig { map: "NZJHGRCXMYSWBOUFAIVLPEKQDT".to_string(), step: 'N' });
        rts.insert("VIII".to_string(), RotorConfig { map: "FKQHTLXOCBJSPDZRAMEWNIUYGV".to_string(), step: 'N' });
        rts.insert("β".to_string(), RotorConfig { map: "LEYJVCNIXWPBQMDRTAKZGFUHOS".to_string(), step: ' '});
        rts.insert("γ".to_string(), RotorConfig { map: "FSOKANUERHMBTIYCWLQPZXVGJD".to_string(), step: ' '});

        let mut rf = HashMap::new();
        let mut rfc1 = Vec::new();
        rfc1.push("AY".to_string());
        rfc1.push("BR".to_string());
        rfc1.push("CU".to_string());
        rfc1.push("DH".to_string());
        rfc1.push("EQ".to_string());
        rfc1.push("FS".to_string());
        rfc1.push("GL".to_string());
        rfc1.push("IP".to_string());
        rfc1.push("JX".to_string());
        rfc1.push("KN".to_string());
        rfc1.push("MO".to_string());
        rfc1.push("TZ".to_string());
        rfc1.push("VW".to_string());
        rf.insert("B".to_string(), rfc1);

        let mut rfc2 = Vec::new();
        rfc2.push("AF".to_string());
        rfc2.push("BV".to_string());
        rfc2.push("CP".to_string());
        rfc2.push("DJ".to_string());
        rfc2.push("EI".to_string());
        rfc2.push("GO".to_string());
        rfc2.push("HY".to_string());
        rfc2.push("KR".to_string());
        rfc2.push("LZ".to_string());
        rfc2.push("MX".to_string());
        rfc2.push("NW".to_string());
        rfc2.push("TQ".to_string());
        rfc2.push("SU".to_string());
        rf.insert("C".to_string(), rfc2);

        let mut rfc3 = Vec::new();
        rfc3.push("AE".to_string());
        rfc3.push("BD".to_string());
        rfc3.push("CK".to_string());
        rfc3.push("DQ".to_string());
        rfc3.push("FU".to_string());
        rfc3.push("GY".to_string());
        rfc3.push("HW".to_string());
        rfc3.push("IJ".to_string());
        rfc3.push("LO".to_string());
        rfc3.push("MP".to_string());
        rfc3.push("RX".to_string());
        rfc3.push("SZ".to_string());
        rfc3.push("TV".to_string());
        rf.insert("B Dünn".to_string(), rfc3);
        
        let mut rfc4 = Vec::new();
        rfc4.push("AR".to_string());
        rfc4.push("BD".to_string());
        rfc4.push("CO".to_string());
        rfc4.push("EJ".to_string());
        rfc4.push("FN".to_string());
        rfc4.push("GT".to_string());
        rfc4.push("HK".to_string());
        rfc4.push("IV".to_string());
        rfc4.push("LM".to_string());
        rfc4.push("PW".to_string());
        rfc4.push("QZ".to_string());
        rfc4.push("SX".to_string());
        rfc4.push("UY".to_string());
        rf.insert("C Dünn".to_string(), rfc4);

        Config {
            rotors: rts,
            reflectors: rf
        }
    }
}