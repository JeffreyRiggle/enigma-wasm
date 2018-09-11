pub struct Plugboard {
    pub plugs: Vec<String>
}

impl Plugboard {
    pub fn create(config: Vec<String>) -> Plugboard {
        Plugboard {
            plugs: config
        }
    }

    pub fn shift(&mut self, letter: char) -> char {
        let mut ret_val = letter;
        
        for plug in self.plugs.iter() {
            let char1 = plug.chars().next().unwrap();
            let char2 = plug.chars().next().unwrap();

            if letter == char1 {
                ret_val = char2;
                break;
            } 
            
            if letter == char2 {
                ret_val = char1;
                break;
            }
        }

        ret_val
    }
}