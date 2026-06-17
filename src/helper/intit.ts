//@ts-ignore
import * as fs from 'fs-extra';
try{
    fs.ensureDir("test-results")
    fs.emptyDir("test-results")

}catch (error) {

console.error("Error creating test-results directory:", error)
}