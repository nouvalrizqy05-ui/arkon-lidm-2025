class AssemblySimulator {
  constructor() {
    this.reset();
  }

  reset() {
    this.registers = { R1: 0, R2: 0, R3: 0, R4: 0 };
    this.memory = Array(16).fill(0);
    this.pc = 0;
    this.alu = { operand1: 0, operand2: 0, result: 0, operation: null };
    this.history = [];
    this.error = null;
  }

  parseInstruction(instruction) {
    const parts = instruction.trim().toUpperCase().split(/\s+/);
    const opcode = parts[0];
    const args = parts.slice(1).join('').split(',');
    return { opcode, args };
  }

  execute(instruction) {
    this.error = null;
    const { opcode, args } = this.parseInstruction(instruction);
    
    try {
      switch (opcode) {
        case 'LOAD':
          // LOAD R1, 5  (Load immediate)
          // LOAD R1, M[0] (Load from memory)
          if (args.length !== 2) throw new Error("LOAD requires 2 arguments");
          const dest = args[0];
          const val = args[1];
          if (!this.registers.hasOwnProperty(dest)) throw new Error("Invalid register");
          
          if (val.startsWith('M[')) {
            const addr = parseInt(val.match(/\d+/)[0]);
            this.registers[dest] = this.memory[addr];
          } else {
            this.registers[dest] = parseInt(val);
          }
          break;

        case 'STORE':
          // STORE R1, M[0]
          if (args.length !== 2) throw new Error("STORE requires 2 arguments");
          const src = args[0];
          const destMem = args[1];
          if (!this.registers.hasOwnProperty(src)) throw new Error("Invalid register");
          if (!destMem.startsWith('M[')) throw new Error("Invalid memory address");
          
          const addrStore = parseInt(destMem.match(/\d+/)[0]);
          this.memory[addrStore] = this.registers[src];
          break;

        case 'ADD':
          // ADD R1, R2, R3 (R1 = R2 + R3)
          if (args.length !== 3) throw new Error("ADD requires 3 arguments");
          const rdest = args[0];
          const rsrc1 = args[1];
          const rsrc2 = args[2];
          
          this.alu.operand1 = this.registers[rsrc1];
          this.alu.operand2 = this.registers[rsrc2];
          this.alu.operation = 'ADD';
          this.alu.result = this.alu.operand1 + this.alu.operand2;
          
          this.registers[rdest] = this.alu.result;
          break;

        default:
          throw new Error("Unknown instruction: " + opcode);
      }
      
      this.pc += 1;
      this.history.push({
        pc: this.pc,
        instruction,
        registers: { ...this.registers },
        memory: [...this.memory]
      });
      
    } catch (err) {
      this.error = err.message;
    }
    
    return this.getState();
  }

  getState() {
    return {
      registers: { ...this.registers },
      memory: [...this.memory],
      pc: this.pc,
      alu: { ...this.alu },
      error: this.error,
      history: [...this.history]
    };
  }
}

export const simulator = new AssemblySimulator();
