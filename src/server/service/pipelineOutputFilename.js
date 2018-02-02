export default {
  bamConversion: {
    controlFileOutput: 'control-file.fq',
    controlFileSEOutput: 'control-se-file.fq',
    mutatedFileOutput: 'mutated-file.fq',
    mutatedFileSEOutput: 'mutated-se-file.fq',
  },
  qualityControl: {
    controlFileOutput: 'trimmed-control-file.fq',
    controlFileSEOutput: 'trimmed-control-se-file.fq',
    mutatedFileOutput: 'trimmed-mutated-file.fq',
    mutatedFileSEOutput: 'trimmed-mutated-se-file.fq',
  },
  alignment: {
    controlFileOutput: 'aligned-control-file.sam',
    mutatedFileOutput: 'aligned-mutated-file.sam',
  },
  samConversion: {
    controlFileOutput: 'aligned-control-file.bam',
    mutatedFileOutput: 'aligned-mutated-file.bam',
  },
  snpCaller: {
    controlFileOutput: 'control-file-snps.vcf',
    mutatedFileOutput: 'mutated-file-snps.vcf',
  },
  snpFiltration: {
    controlFileOutput: 'filtrated-control-snps.txt',
    mutatedFileOutput: 'filtrated-mutated-snps.txt',
  },
  subtraction: {
    output: 'subtracted-snps.txt',
  },
};
